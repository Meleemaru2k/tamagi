"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
export default function Page2(props: Page2Props) {
  const buttonIndex = useDisplay().display.buttonIndex;
  const displayStatus = useDisplay().display.status;
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

  const colours = ["red", "blue", "green", "back to main menu"];

  return (
    <div
      className={cn(
        changeScreen(),
        "h-[100%] w-[100%] flex flex-col items-center justify-between"
      )}
    >
      <h1>Settings Page</h1>
      {displayStatus === "ON"
        ? colours.map((colour, i) => {
            if (i === buttonIndex) {
              return (
                <div
                  key={i}
                  className={`border-2 border-black border-solid bg-${colour}-500`}
                >
                  {i < 3 ? `Set Colour To ${colour}` : `${colour}`}
                </div>
              );
            } else {
              return (
                <div key={i} className={`bg-${colour}-500`}>
                  {i < 3 ? `Set Colour To ${colour}` : `${colour}`}
                </div>
              );
            }
          })
        : ""}
    </div>
  );
}

export type Page2Props = {};
