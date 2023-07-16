"use client";

import { useState } from "react";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
import { useTamagiShell } from "@/stores/tamagiShell";
import { TamagiShellColour } from "@/stores/tamagiShell";

export default function Button(props: ButtonProps) {
  const setTamagiShellColour = useTamagiShell().setTamagiShellColour;
  const tamagiShellColour = TamagiShellColour;
  const display = useDisplay().display;
  //
  const displayStatus = display.status;
  const pageIndex = display.pageIndex;
  const menuActive = display.menuActive;
  const buttonIndex = display.buttonIndex;
  //
  const setDisplayStatus = useDisplay().setDisplayStatus;
  const increasePageIndex = useDisplay().increasePageIndex;
  const decreasePageIndex = useDisplay().decreasePageIndex;
  const setPageIndex = useDisplay().setPageIndex;
  const setMenuActive = useDisplay().setMenuActive;
  const setButtonIndex = useDisplay().setButtonIndex;
  const increaseButtonIndex = useDisplay().increaseButtonIndex;
  const decreaseButtonIndex = useDisplay().decreaseButtonIndex;
  const setStatIndex = useDisplay().setStatIndex;
  const increaseStatIndex = useDisplay().increaseStatIndex;
  const decreaseStatIndex = useDisplay().decreaseStatIndex;

  //
  const buttonType = props.buttonType;
  //
  const [isPowerButtonPressed, setIsPowerButtonPressed] = useState(false);
  const [isEnterButtonPressed, setIsEnterButtonPressed] = useState(false);
  const [isLeftButtonPressed, setIsLeftButtonPressed] = useState(false);
  const [isRightButtonPressed, setIsRightButtonPressed] = useState(false);
  ////
  const buttonsSet = [
    isPowerButtonPressed,
    isEnterButtonPressed,
    isLeftButtonPressed,
    isRightButtonPressed,
  ];
  const buttonSetters = [
    setIsPowerButtonPressed,
    setIsEnterButtonPressed,
    setIsLeftButtonPressed,
    setIsRightButtonPressed,
  ];

  const handleSubmit = () => {
    if (displayStatus === "ON") {
      setMenuActive(!menuActive);
      if (menuActive) {
        if (pageIndex === 0) {
          setPageIndex(buttonIndex + 1);
          setButtonIndex(0);
        }
        if (pageIndex === 0 && buttonIndex === 3) {
          setPageIndex(0);
        }

        if (pageIndex === 2 && buttonIndex === 3) {
          setPageIndex(0);
        }
        if (pageIndex === 2) {
          setTamagiShellColour(tamagiShellColour[buttonIndex]);
          setButtonIndex(0);
        }
      }
      setMenuActive(!menuActive);
    }
  };

  const buttonStyle = () => {
    switch (buttonType) {
      case "POWER":
        return {
          bg: "bg-blue-500 text-white",
          text: "O",
          menuActiveText: "X",
          onClick: () => {
            buttonSetters[0](!buttonsSet[0]);
            displayStatus !== "ON"
              ? setDisplayStatus("ON")
              : setDisplayStatus("OFF");
            {
              buttonsSet[0] ? setPageIndex(0) : "";
              buttonsSet[0] ? setMenuActive(false) : "";
            }
          },
        };
      case "ENTER":
        return {
          bg: "bg-teal-500 text-white",
          text: "+",
          menuActiveText: "++",
          onClick: () => handleSubmit(),
        };
      case "LEFT":
        return {
          bg: "bg-yellow-500 text-black",
          text: "<",
          menuActiveText: "<<",
          onClick: () => {
            if (pageIndex === 1 && menuActive) {
              decreaseStatIndex(1);
            }
            if (menuActive) {
              if (buttonIndex > 0) {
                decreaseButtonIndex(1);
              }
            }
            if (!menuActive) {
              decreasePageIndex(1);
            }
          },
        };
      case "RIGHT":
        return {
          bg: "bg-red-500 text-white",
          text: ">",
          menuActiveText: ">>",
          onClick: () => {
            if (pageIndex === 1 && menuActive) {
              increaseStatIndex(1);
            }
            if (menuActive) {
              if (pageIndex === 1) {
                if (buttonIndex < 1) {
                  increaseButtonIndex(1);
                }
              }
              if (pageIndex !== 1 && buttonIndex < 3) {
                increaseButtonIndex(1);
              }
            }
            if (!menuActive) {
              increasePageIndex(1);
            }
          },
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
    <button
      className={cn(
        buttonStyle(),
        "px-2 py-1 rounded-sm border-[1px] border-teal-700 transition-all h-[50px]"
      )}
      onClick={buttonStyle().onClick}
    >
      {menuActive ? buttonStyle().menuActiveText : buttonStyle().text}
    </button>
  );
}

export type ButtonProps = {
  buttonType?: "POWER" | "ENTER" | "LEFT" | "RIGHT";
};
