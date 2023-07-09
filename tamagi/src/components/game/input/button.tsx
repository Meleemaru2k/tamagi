"use client";

import { useState } from "react";
import cn from "classnames";
import { useDisplay } from "@/stores/display";

export default function Button(props: ButtonProps) {
  const setDisplayStatus = useDisplay().setDisplayStatus;
  const increasePageIndex = useDisplay().increasePageIndex;
  const decreasePageIndex = useDisplay().decreasePageIndex;
  const pageIndex = useDisplay().display.pageIndex;
  const display = useDisplay().display.status;
  const buttonType = props.buttonType;
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const buttonStyle = () => {
    switch (buttonType) {
      case "POWER":
        return {
          bg: "bg-blue-500 text-white",
          pressedText: "O",
          notPressedText: "X",
          onClick: () => {
            setIsButtonPressed(!isButtonPressed);
            display !== "ON" ? setDisplayStatus("ON") : setDisplayStatus("OFF");
          },
        };
      case "ENTER":
        return {
          bg: "bg-teal-500 text-white",
          pressedText: "+",
          notPressedText: "-",
        };
      case "LEFT":
        return {
          bg: "bg-yellow-500 text-black",
          pressedText: "<<",
          notPressedText: "<",
          onClick: () => {
            increasePageIndex(1);
            console.log(pageIndex);
          },
        };
      case "RIGHT":
        return {
          bg: "bg-red-500 text-white",
          onClick: () => {
            decreasePageIndex(1);
            console.log(pageIndex);
          },
          pressedText: ">>",
          notPressedText: ">",
        };
      default:
        return {
          bg: "bg-blue-500 text-white",
          text: "",
          onClick: () => {},
        };
    }
  };

  return (
    <div className="flex">
      <button
        className={cn(
          buttonStyle(),
          "px-2 py-1 rounded-sm border-[1px] border-teal-700 transition-all h-[50px]"
        )}
        onClick={buttonStyle().onClick}
      >
        {isButtonPressed
          ? buttonStyle().pressedText
          : buttonStyle().notPressedText}
      </button>
    </div>
  );
}

export type ButtonProps = {
  buttonType?: "POWER" | "ENTER" | "LEFT" | "RIGHT";
};
