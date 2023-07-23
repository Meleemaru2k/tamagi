/* eslint-disable @next/next/no-img-element */
"use client";
import "./status.css";
import cn from "classnames";
import { useTamagi } from "@/stores/tamagi";
import { getSpritePos } from "@/utils/utils";
const foodmap: Record<string, any> = {
  NaN: { x: 6, y: 1 },
  0: { x: 6, y: 1 },
  1: { x: 7, y: 1 },
  2: { x: 6, y: 2 },
  3: { x: 7, y: 2 },
  4: { x: 7, y: 3 },
};

export default function Food() {
  const animation = useTamagi().animation.type;
  const show = animation === "eating";
  const eventCreationTime = useTamagi().eventInProgress?.timeCreated ?? 0;
  const foodToShowIndex = (eventCreationTime % 4).toString();
  const spritePostion = getSpritePos(
    foodmap[foodToShowIndex].x,
    foodmap[foodToShowIndex].y
  );

  if (show) {
    return (
      <div
        className={cn(animation, " food absolute w-[48px] h-[48px]")}
        style={{
          top: `calc(90% - 36px)`,
          left: `50%`,
        }}
      >
        <img
          src="/tamagis.png"
          alt="tamagi"
          className="object-none scale-[3] h-[16px] w-[16px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            imageRendering: "pixelated",
            objectPosition: `${spritePostion.x}px ${spritePostion.y}px`,
          }}
        ></img>
      </div>
    );
  } else {
    return null;
  }
}

export type TamagiProps = {};
