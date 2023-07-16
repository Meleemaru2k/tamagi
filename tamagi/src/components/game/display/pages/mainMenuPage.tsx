"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
export default function Page0(props: Page0Props) {
  const displayStatus = useDisplay().display.status;
  const buttonIndex = useDisplay().display.buttonIndex;
  const menuActive = useDisplay().display.menuActive;

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
  const pages = ["Start", "Settings", "Credits", "Cancel"];
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
          {pages.map((page, i) => {
            if (buttonIndex === i && menuActive === true) {
              return (
                <button key={i} className="border-solid border-black border-2">
                  {page}
                </button>
              );
            } else {
              return (
                <button
                  className="border-solid border-red-500 border-2"
                  key={i}
                >
                  {page}
                </button>
              );
            }
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export type Page0Props = {};
