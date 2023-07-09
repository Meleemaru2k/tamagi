"use client";
import cn from "classnames";
import Display from "./display";
import ButtonRow from "../input/buttonRow";
import { useTamagi } from "@/stores/tamagi";
import { useTamagiShell } from "@/stores/tamagiShell";
export default function TamagiShell(props: TamagiShellProps) {
  const tamagi = useTamagi().tamagi;
  const tamagiShell = useTamagiShell().tamagiShell;
  return (
    <div
      className={`bg-${tamagiShell.colour}-500 h-[500px] w-[500px] flex flex-col items-center place-content-evenly`}
    >
      <h1>{tamagi.name}</h1>
      <Display />
      <ButtonRow
        buttons={[
          { buttonType: "POWER" },
          { buttonType: "ENTER" },
          { buttonType: "LEFT" },
          { buttonType: "RIGHT" },
        ]}
      ></ButtonRow>
    </div>
  );
}
export type TamagiShellProps = {
  tamagiShellColour: "RED" | "BLUE";
};
