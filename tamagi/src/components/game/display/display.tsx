"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
import Page0 from "./pages/page0";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
export default function Display(props: DisplayProps) {
  const displayStatus = useDisplay().display.status;
  const pageIndex = useDisplay().display.pageIndex;
  const pageArray = [
    { el: <Page0 />, key: 0 },
    { el: <Page1 />, key: 1 },
    { el: <Page2 />, key: 2 },
    { el: <Page3 />, key: 3 },
  ];
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
    <div className={cn(changeScreen(), "h-[500px] w-[500px]")}>
      {pageArray[pageIndex].el}
    </div>
  );
}

export type DisplayProps = {};
