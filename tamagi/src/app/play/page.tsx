"use client";
import Button from "@/components/game/input/button";
import ButtonRow from "@/components/game/input/buttonRow";
import Test from "@/components/test";
import TamagiShell from "@/components/game/display/tamagiShell";
import gameloop from "@/utils/gameloop";

export default function Page() {
  if (!gameloop.isRunning()) {
    gameloop.start();
    console.log("gameloop started");
  }

  return (
    <div className="flex gap-2 content-center m-[20px]">
      <div onClick={() => gameloop.stop()}>OK</div>
      <Test></Test>
      <Button buttonText="test"></Button>
      <Button buttonText="test" buttonType="SUCCESS"></Button>
      <Button buttonText="test" buttonType="DANGER"></Button>
      <ButtonRow
        buttons={[{ buttonText: "test" }, { buttonText: "test2" }]}
      ></ButtonRow>
      <TamagiShell tamagiShellColour="RED" />
      <TamagiShell tamagiShellColour="BLUE" />
    </div>
  );
}
