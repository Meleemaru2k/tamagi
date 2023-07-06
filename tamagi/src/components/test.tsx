"use client";

import { TamagiMinMax, useTamagi } from "@/stores/tamagi";

export default function Test() {
  const tamagiHunger = useTamagi((state) => state.tamagi.hunger);
  const setHunger = useTamagi((state) => state.setHunger);
  const increaseHunger = useTamagi((state) => state.increaseHunger);
  const decreaseHunger = useTamagi((state) => state.decreaseHunger);

  return (
    <div>
      <div onClick={() => setHunger(50)}>Hunger to 50</div>
      <div onClick={() => increaseHunger(2)}>Hunger Increase 2</div>
      <div onClick={() => decreaseHunger(2)}>Hunger Decrease 2</div>
      {tamagiHunger} / {TamagiMinMax.HungerMax}
    </div>
  );
}
