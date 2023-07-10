"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
import MainMenuPage from "./pages/mainMenuPage";
import GamePage from "./pages/gamePage";
import SettingsPage from "./pages/settingsPage";
import CreditsPage from "./pages/creditsPage";
export default function Display(props: DisplayProps) {
  const displayStatus = useDisplay().display.status;
  const pageIndex = useDisplay().display.pageIndex;
  const pageArray = [
    { el: <MainMenuPage />, key: 0 },
    { el: <GamePage />, key: 1 },
    { el: <SettingsPage />, key: 2 },
    { el: <CreditsPage />, key: 3 },
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
