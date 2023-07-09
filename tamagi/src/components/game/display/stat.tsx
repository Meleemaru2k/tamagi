"use client";

import { useEffect, useState } from "react";
import cn from "classnames";

export default function Stat(props: StatProps) {
  const statType = props.statType;
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

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
        return "rounded w-[20px] h-[20px] bg-teal-500 ";
      case "STAT_VALUE":
        return "w-[20px] h-[10px] bg-gray-500";
    }
  };

  return (
    <div className="flex">
      {isPopUpVisible ? (
        <div
          className="h-[75px] w-[300px] absolute bg-blue-500 z-index-[1]"
          onClick={() => setIsPopUpVisible(!isPopUpVisible)}
        ></div>
      ) : (
        <button
          className={cn(
            statStyle(),
            "px-2 py-1 rounded-sm border-[1px] border-teal-700 transition-all"
          )}
          onClick={() => setIsPopUpVisible(!isPopUpVisible)}
        ></button>
      )}
    </div>
  );
}

export type StatProps = {
  statType?: "WARNING" | "STAT_VALUE";
};
