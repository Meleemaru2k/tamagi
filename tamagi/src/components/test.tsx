"use client";

import { useTamagi } from "@/stores/tamagi";
import gameloop from "@/utils/gameloop";
import { userEvents } from "@/utils/events";
import { useTamagiShell } from "@/stores/tamagiShell";

export default function Test() {
  //Tamagi Shell
  const tamagiShellColour = useTamagiShell(
    (state) => state.setTamagiShellColour
  );

  //Tamagi
  const tamagi = useTamagi();
  tamagi.eventInProgress;

  return (
    <div>
      {tamagi.tamagi.name}
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

      <div className="flex flex-col gap-2 my-2 text-black [&_>*]:rounded-md [&_>*]:cursor-pointer text-center">
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.feed)}
        >
          Feed
        </div>
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.healSick)}
        >
          Heal
        </div>
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.play)}
        >
          Play
        </div>
        <div
          className="p-2 bg-slate-200"
          onClick={() => gameloop.addUserEvent(userEvents.clean)}
        >
          Clean
        </div>

        <div className="flex flex-col [&_>div:nth-child(2n)]:pb-2 [&_>div:nth-child(2n)]:border-b-2 [&_>div:nth-child(2n)]:border-solid [&_>div:nth-child(2n)]:border-black">
          <div>Hunger</div>
          <div>
            {tamagi.tamagi.hunger} / {tamagi.tamagi.type.minMaxStats.hunger[1]}
          </div>
          <div>Happyness</div>
          <div>
            {tamagi.tamagi.happiness} /{" "}
            {tamagi.tamagi.type.minMaxStats.happiness[1]}
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
