import { format } from "date-fns";
import React, { useMemo } from "react";
// import { useSearchParams } from "react-router-dom";
import { addWeekToRange } from "@/lib/week";
import styles from "@/styles/WeekSelector.module.scss";

interface Props {
  dateRange: string[];
}

const SERVICE_START_DATE = new Date("2023-04-01");

const WeekSelector = ({ dateRange }: Props) => {
  const [startDate, endDate] = useMemo(() => {
    const [startDate, endDate] = dateRange;
    const start = format(new Date(startDate), "yyy년 MM월 dd일");
    const end = format(new Date(endDate), "yyy년 MM월 dd일");
    return [start, end];
  }, [dateRange]);
  // const [, setSearchParams] = useSearchParams();

  /** TODO: refactor to link */
  const onClickPrev = () => {
    const [start, end] = addWeekToRange(dateRange, -1);
    // setSearchParams({ mode: "past", start, end });
  };

  const onClickNext = () => {
    const [start, end] = addWeekToRange(dateRange, +1);
    // setSearchParams({ mode: "past", start, end });
  };

  // TODO: 끝 날짜의 00:59:59 가지의 시간으로 정정해주기(feat. 시작 날짜도 마찬가지)
  const [prevDisabled, nextDisabled] = useMemo(() => {
    const today = new Date();
    const [start, end] = dateRange.map((date) => new Date(date));
    return [start <= SERVICE_START_DATE, end >= today];
  }, [dateRange]);

  return (
    <div className={styles.block}>
      <div className={styles.date_info}>
        {startDate} ~ {endDate}
      </div>
      <div className={styles.week_navigator}>
        <button
          className={styles.text_button}
          onClick={onClickPrev}
          disabled={prevDisabled}
        >
          이전 주
        </button>
        <button
          className={styles.text_button}
          onClick={onClickNext}
          disabled={nextDisabled}
        >
          다음 주
        </button>
      </div>
    </div>
  );
};

export default WeekSelector;
