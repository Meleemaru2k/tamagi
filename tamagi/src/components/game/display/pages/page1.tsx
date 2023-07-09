"use client";
import cn from "classnames";
import Tamagi from "../tamagi";
import StatRow from "../statRow";
import { useDisplay } from "@/stores/display";
export default function Page1(props: Page1Props) {
  const displayStatus = useDisplay().display.status;

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
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "STAT_VALUE" },
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
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "WARNING" },
              { statType: "STAT_VALUE" },
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

export type Page1Props = {};
