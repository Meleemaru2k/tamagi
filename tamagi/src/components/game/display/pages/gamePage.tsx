"use client";
import cn from "classnames";
import Tamagi from "../tamagi";
import StatRow from "../statRow";
import { useDisplay } from "@/stores/display";
import { useTamagi } from "@/stores/tamagi";
export default function GamePage(props: GamePageProps) {
  const displayStatus = useDisplay().display.status;
  const buttonIndex = useDisplay().display.buttonIndex;
  const menuActive = useDisplay().display.menuActive;
  const fullUpedness = useTamagi().tamagi.hunger;
  const tamagi = useTamagi();

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

  const changeHealthBar = (fullUpedness: number) => {
    if (fullUpedness > 90) {
      return "w-[90px] bg-green-500";
    }
    if (fullUpedness > 80) {
      return "w-[80px] bg-green-400";
    }
    if (fullUpedness > 70) {
      return "w-[70px] bg-green-300";
    }
    if (fullUpedness > 60) {
      return "w-[60px] bg-orange-300";
    }
    if (fullUpedness > 50) {
      return "w-[50px] bg-orange-400";
    }
    if (fullUpedness > 40) {
      return "w-[40px] bg-orange-500";
    }
    if (fullUpedness > 30) {
      return "w-[30px] bg-red-300";
    }
    if (fullUpedness > 20) {
      return "w-[20px] bg-red-400";
    }
    if (fullUpedness > 0) {
      return "w-[10px] bg-red-500";
    } else {
      return "w-[100px] bg-black text-white";
    }
  };

  return (
    <div className={cn(changeScreen(), "h-[100%] w-[100%]")}>
      {displayStatus === "ON" ? (
        <div className="flex flex-col items-center place-content-evenly w-[100%] h-[100%] bg-gray-200">
          <div>
            <div
              className={cn(changeHealthBar(fullUpedness), "h-[20px] bg-black")}
            >
              Healthbar
            </div>
            <div>
              {tamagi.tamagi.sick?.timeHealed === null ? (
                <div className="text-red-500">
                  <h1>+:{tamagi.tamagi.sick.type.name}</h1>
                </div>
              ) : (
                <div className="text-green-500">
                  <h1>+</h1>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${
              menuActive && buttonIndex === 0
                ? "border-solid border-black border-2 w-[100%] h-[100px]"
                : "w-[100%] h-[100px]"
            }`}
          >
            <StatRow
              stats={[
                { statType: "FULLUPEDNESS" },
                { statType: "WARNING" },
                { statType: "STAT_VALUE" },
                { statType: "STAT_VALUE" },
              ]}
            ></StatRow>
          </div>
          <Tamagi />
          <div
            className={`${
              menuActive && buttonIndex === 1
                ? "border-solid border-black border-2 w-[100%] h-[100px]"
                : "w-[100%] h-[100px]"
            }`}
          >
            <StatRow
              stats={[
                { statType: "WARNING" },
                { statType: "STAT_VALUE" },
                { statType: "WARNING" },
                { statType: "STAT_VALUE" },
              ]}
            ></StatRow>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export type GamePageProps = {};
