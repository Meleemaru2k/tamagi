"use client";

import { useEffect, useState } from "react";
import cn from "classnames";
import { useTamagi } from "@/stores/tamagi";

export default function Stat(props: StatProps) {
  const statType = props.statType;
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const fullUpedness = useTamagi().tamagi.hunger;

  useEffect(() => {
    if (isPopUpVisible) {
      setTimeout(() => {
        setIsPopUpVisible(false);
      }, 2000);
    }
  });

  const statStyle = () => {
    switch (statType) {
      case "WARNING":
        return "bg-teal-500 ";
      case "STAT_VALUE":
        return "bg-gray-500";
      case "FULLUPEDNESS":
        if (fullUpedness > 70) {
          return `bg-green-500`;
        } else if (fullUpedness > 50) {
          return "bg-orange-500 ";
        } else {
          return " bg-red-500 ";
        }
    }
  };

  return (
    <div className="flex h-[25px]">
      {isPopUpVisible ? (
        <div
          className="h-[75px] w-[300px] bg-blue-500 z-index-[1]"
          onClick={() => setIsPopUpVisible(!isPopUpVisible)}
        ></div>
      ) : (
        <div
          className={cn(statStyle(), "rounded w-[25px] h-[25px]")}
          onClick={() => setIsPopUpVisible(!isPopUpVisible)}
        >
          H
        </div>
      )}
    </div>
  );
}

export type StatProps = {
  statType?: "WARNING" | "STAT_VALUE" | "FULLUPEDNESS";
};
