"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
import { useTamagi } from "@/stores/tamagi";
import { useTamagiShell } from "@/stores/tamagiShell";
export default function Page2(props: Page2Props) {
  const displayStatus = useDisplay().display.status;
  //Tamagi Shell
  const tamagiShellColour = useTamagiShell(
    (state) => state.setTamagiShellColour
  );
  const pageIndex = useDisplay((state) => state.display.pageIndex);

  //Tamagi
  const setTamagiName = useTamagi().setName;

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
        "h-[100%] w-[100%] flex flex-col items-center justify-between"
      )}
    >
      {displayStatus === "ON" ? (
        <>
          <h1>Settings Page</h1>
          <div className="border-[1px]">
            name:
            <input
              className="border-[1px]"
              onChange={(e) => {
                setTamagiName(e.target.value);
              }}
            ></input>
          </div>
          <div
            className="border-[1px] bg-red-500"
            onClick={() => tamagiShellColour("red")}
          >
            Set Shell Colour To Red
          </div>
          <div
            className="border-[1px] bg-blue-500"
            onClick={() => tamagiShellColour("blue")}
          >
            Set Shell Colour To Blue
          </div>
          <div
            className="border-[1px] bg-green-500 "
            onClick={() => tamagiShellColour("green")}
          >
            Set Shell Colour To Green
          </div>
          <div
            className="border-[1px] bg-teal-500"
            onClick={() => tamagiShellColour("teal")}
          >
            Set Shell Colour To Teal
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export type Page2Props = {};
