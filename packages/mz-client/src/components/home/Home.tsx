"use client";

import styles from "@/styles/StyledTabLayout.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LinkCardList from "@/components/home/LinkCardList";
import ListModeSelector from "@/components/home/ListModeSelector";
import WeekSelector from "@/components/home/WeekSelector";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSearchParams } from "next/navigation";
import { getItems } from "@/lib/api/items";
import { EnglishRegionNameType, ListMode } from "@/types/db";
import { getWeekRangeFromDate } from "@/lib/week";
import SkeletonUI from "@/components/system/SkeletonUI";
import EmptyList from "../system/EmptyList";
import TabLayout from "../layout/TabLayout";
import { isMobile } from "@/lib/isMobile";
import RegionCategorySelector from "./RegionCategorySelector";

export default function Home() {
  const observerTargetEl = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<ListMode>(
    (searchParams.get("mode") as ListMode | null) ?? "trending"
  );
  const [region, setRegion] = useState<EnglishRegionNameType>(
    (searchParams.get("region") as EnglishRegionNameType | null) ?? "all"
  );

  // console.log(mode, region);

  const defaultDateRange = useMemo(() => getWeekRangeFromDate(new Date()), []);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const [dateRange, setDateRange] = useState(
    startDate && endDate ? [startDate, endDate] : defaultDateRange
  );
  const [isMobileMode, setIsMobileMode] = useState(false);

  const {
    status,
    data: infiniteData,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["Items", mode, region, mode === "past" ? dateRange : undefined].filter(
      (item) => !!item
    ),
    ({ pageParam = undefined }) =>
      getItems({
        mode,
        region,
        cursor: pageParam,
        ...(mode === "past"
          ? { startDate: dateRange[0], endDate: dateRange[1] }
          : {}),
      }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.pageInfo.hasNextPage) return undefined;
        return lastPage.pageInfo.endCursor;
      },
    }
  );

  const fetchNextData = useCallback(() => {
    if (!hasNextPage) return;
    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  useInfiniteScroll(observerTargetEl, fetchNextData);

  useEffect(() => {
    const nextMode = (searchParams.get("mode") as ListMode) ?? "trending";
    const nextRegion =
      (searchParams.get("region") as EnglishRegionNameType) ?? "all";
    if (nextMode !== mode) {
      setMode(nextMode);
    }
    if (nextRegion !== region) {
      setRegion(nextRegion);
    }
  }, [searchParams, mode, region]);

  useEffect(() => {
    if (mode === "past") {
      setDateRange(
        startDate && endDate ? [startDate, endDate] : defaultDateRange
      );
    }
  }, [startDate, endDate, defaultDateRange, mode]);

  // just for responsive design
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== undefined) {
        setIsMobileMode(isMobile());
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = infiniteData?.pages.flatMap((page) => page.list);

  return (
    <TabLayout className="layout_padding" showRegionCategorySelector>
      <div className={styles.content}>
        <ListModeSelector mode={mode} />
        {mode === "past" && <WeekSelector dateRange={dateRange} />}
        {isMobileMode && (
          <div className={styles.category_wrapper}>
            <RegionCategorySelector />
          </div>
        )}
        {status === "loading" ? (
          <SkeletonUI />
        ) : status === "error" ? (
          // TODO: define error type
          <div>Error: {(error as any).message}</div>
        ) : items ? (
          <LinkCardList items={items} />
        ) : null}
        <div ref={observerTargetEl} />
      </div>
      {items?.length === 0 ? <EmptyList /> : null}
    </TabLayout>
  );
}
