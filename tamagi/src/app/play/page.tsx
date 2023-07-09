"use client";
import Button from "@/components/game/input/button";
import ButtonRow from "@/components/game/input/buttonRow";
import Test from "@/components/test";
import TamagiShell from "@/components/game/display/tamagiShell";
export default function Page() {
  return (
    <div className="flex gap-2 content-center m-[20px]">
      <div>OK</div>
      <Test></Test>
      <div className="flex">
        <Button buttonType="POWER"></Button>
        <Button buttonType="ENTER"></Button>
        <Button buttonType="LEFT"></Button>
        <Button buttonType="RIGHT"></Button>
      </div>
      <ButtonRow
        buttons={[
          { buttonType: "POWER" },
          { buttonType: "ENTER" },
          { buttonType: "LEFT" },
          { buttonType: "RIGHT" },
        ]}
      ></ButtonRow>
      <TamagiShell tamagiShellColour="RED" />
    </div>
  );
}
