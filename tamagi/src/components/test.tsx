"use client";

import { TamagiMinMax, useTamagi } from "@/stores/tamagi";
import gameloop from "@/utils/gameloop";
import { cpuEvent, userEvent, userEvents } from "@/utils/types";
import { useDisplay } from "@/stores/display";
import { useTamagiShell } from "@/stores/tamagiShell";

export default function Test() {
  //Tamagi Shell
  const tamagiShellColour = useTamagiShell(
    (state) => state.setTamagiShellColour
  );

  //Tamagi
  const setTamagiName = useTamagi((state) => state.setName);
  const tamagi = useTamagi();
  tamagi.eventInProgress;

  const iconIndex = useDisplay((state) => state.display.pageIndex);
  let tamagiName = "";

  const handleSubmit = () => {
    setTamagiName(tamagiName);
    console.log(document.getElementById("nameInput"));
  };

  return (
    <div>
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
      <div className="border-[1px]" onClick={() => tamagiShellColour("red")}>
        Set Shell Colour To Red
      </div>
      <div className="border-[1px]" onClick={() => tamagiShellColour("blue")}>
        Set Shell Colour To Blue
      </div>
      <div className="border-[1px] " onClick={() => tamagiShellColour("green")}>
        Set Shell Colour To Green
      </div>
      <div className="border-[1px]" onClick={() => tamagiShellColour("teal")}>
        Set Shell Colour To Teal
      </div>

      <div className="flex flex-col gap-2">
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.feed)}
        >
          Dispatch Feed Event
        </div>
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.healSick)}
        >
          Dispatch Heal Event
        </div>

        <div className="flex flex-col [&_>div:nth-child(2n)]:pb-2 [&_>div:nth-child(2n)]:border-b-2 [&_>div:nth-child(2n)]:border-solid [&_>div:nth-child(2n)]:border-black">
          <div>Hunger</div>
          <div>
            {tamagi.tamagi.hunger} / {TamagiMinMax.HungerMax}
          </div>
          <div>Current Event</div>
          <div>{tamagi.eventInProgress?.type ?? "none"}</div>
          <div>Event-Progess:</div>
          <div>
            {tamagi.eventInProgress
              ? `${
                  tamagi.lastUpdate.time - tamagi.eventInProgress?.timeCreated
                } / 
          ${tamagi.eventInProgress?.time.toString()}`
              : "none"}
          </div>
          <div>Is Sick:</div>
          <div>
            {tamagi.tamagi.sick?.timeHealed === null
              ? tamagi.tamagi.sick.type.name
              : "false"}
          </div>
        </div>
      </div>
    </div>
  );
}
