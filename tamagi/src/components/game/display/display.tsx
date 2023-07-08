"use client";
import cn from "classnames";
import Tamagi from "./tamagi";
import StatRow from "./statRow";
import { useTamagi } from "@/stores/tamagi";
export default function Display(props: DisplayProps) {
  const displayStatus = props.displayStatus;
  const tamagi = useTamagi().tamagi;
  const changeScreen = () => {
    switch (displayStatus) {
      case "OFF":
        return "bg-black";
      case "ON":
        return "bg-white";
      case "STANDBY":
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={cn(
        changeScreen(),
        "h-[300px] w-[300px] flex flex-col items-center justify-between"
      )}
    >
      {displayStatus === "ON" ? (
        <>
          {" "}
          <StatRow
            stats={[
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "STAT_VALUE" },
              { statType: "STAT_VALUE" },
              { statType: "STAT_VALUE" },
            ]}
          ></StatRow>
          <Tamagi />
          <StatRow
            stats={[
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "STAT_VALUE" },
              { statType: "STAT_VALUE" },
              { statType: "STAT_VALUE" },
            ]}
          ></StatRow>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export type DisplayProps = {
  displayStatus: "ON" | "OFF" | "STANDBY";
};
