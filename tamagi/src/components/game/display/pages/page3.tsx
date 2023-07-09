"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
export default function Page3(props: Page3Props) {
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
          <h1>Credits Page</h1>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export type Page3Props = {};
