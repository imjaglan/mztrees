"use client";
// A Custom Hydrate Component
import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />;
}

export default Hydrate;
