"use client";
import cn from "classnames";
import { useDisplay } from "@/stores/display";
import { useTamagi } from "@/stores/tamagi";
import { useTamagiShell } from "@/stores/tamagiShell";
import { displayPartsToString } from "typescript";
export default function Page2(props: Page2Props) {
  const displayStatus = useDisplay().display.status;
  //Tamagi Shell
  const tamagiShellColour = useTamagiShell(
    (state) => state.setTamagiShellColour
  );
  const iconIndex = useDisplay((state) => state.display.pageIndex);
  let tamagiName = "";

  //Tamagi
  const setTamagiName = useTamagi((state) => state.setName);

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

  const handleSubmit = () => {
    setTamagiName(tamagiName);
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
          <h1>Settings Page</h1>
          <div className="border-[1px]">
            <h1> ICON INDEX: {iconIndex}</h1>
            <input
              id="nameInput"
              className="border-[1px]"
              onChange={(e) => (tamagiName = e.target.value)}
            ></input>
            {/* to do: should clear on submit */}
            <button type="submit" onClick={() => handleSubmit()}>
              Set name
            </button>
          </div>
          <div
            className="border-[1px]"
            onClick={() => tamagiShellColour("red")}
          >
            Set Shell Colour To Red
          </div>
          <div
            className="border-[1px]"
            onClick={() => tamagiShellColour("blue")}
          >
            Set Shell Colour To Blue
          </div>
          <div
            className="border-[1px] "
            onClick={() => tamagiShellColour("green")}
          >
            Set Shell Colour To Green
          </div>
          <div
            className="border-[1px]"
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
