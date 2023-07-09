"use client";

import { useDisplay } from "@/stores/display";
import { /*TamagiMinMax, */ useTamagi } from "@/stores/tamagi";
import { useTamagiShell } from "@/stores/tamagiShell";

export default function Test() {
  //Tamagi Shell
  const tamagiShellColour = useTamagiShell(
    (state) => state.setTamagiShellColour
  );

  //Tamagi
  const setTamagiName = useTamagi((state) => state.setName);
  const tamagiHunger = useTamagi((state) => state.tamagi.hunger);
  const setHunger = useTamagi((state) => state.setHunger);
  const increaseHunger = useTamagi((state) => state.increaseHunger);
  const decreaseHunger = useTamagi((state) => state.decreaseHunger);
  const iconIndex = useDisplay((state) => state.display.iconIndex);

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
        Set Shell Colour To Purple
      </div>
      <div onClick={() => setHunger(50)}>Hunger to 50</div>
      <div onClick={() => increaseHunger(2)}>Hunger Increase 2</div>
      <div onClick={() => decreaseHunger(2)}>Hunger Decrease 2</div>
    </div>
  );
}
