"use client";
import cn from "classnames";
import Display from "./display";
import ButtonRow from "../input/buttonRow";
import { useTamagi } from "@/stores/tamagi";
export default function TamagiShell(props: TamagiShellProps) {
  const tamagi = useTamagi().tamagi;
  const tamagiShellColour = props.tamagiShellColour;

  const shellStyle = () => {
    switch (tamagiShellColour) {
      case "RED":
        return "bg-red-500";
      case "BLUE":
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={cn(
        shellStyle(),
        "h-[500px] w-[500px] flex flex-col items-center place-content-evenly"
      )}
    >
      <h1>{tamagi.name}</h1>
      <Display displayStatus="ON" />
      <ButtonRow
        buttons={[
          { buttonText: "O" },
          { buttonText: "+" },
          { buttonText: "<" },
          { buttonText: ">" },
        ]}
      ></ButtonRow>
    </div>
  );
}
export type TamagiShellProps = {
  tamagiShellColour: "RED" | "BLUE";
};
