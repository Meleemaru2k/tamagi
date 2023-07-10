"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
export default function Page0(props: Page0Props) {
  const displayStatus = useDisplay().display.status;
  const setPageIndex = useDisplay().setPageIndex;

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
  const buttons = ["Start", "Settings", "Credits"];
  return (
    <div
      className={cn(
        changeScreen(),
        "h-[100%] w-[100%] flex flex-col items-center justify-between"
      )}
    >
      {displayStatus === "ON" ? (
        <>
          <h1>MAIN MENU</h1>
          {buttons.map((button, i) => {
            return (
              <button key={i} onClick={() => setPageIndex(i + 1)}>
                {button}
              </button>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export type Page0Props = {};
