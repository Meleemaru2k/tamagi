/* eslint-disable @next/next/no-img-element */
"use client";
import "./status.css";
import cn from "classnames";
import { useTamagi } from "@/stores/tamagi";
import { getSpritePos } from "@/utils/utils";

export default function Poop() {
  const spritePostion = getSpritePos(7, 0);
  const poopPositionsByIndex = [
    { x: 0, y: 0 },
    { x: 140, y: 0 },
    { x: 80, y: 10 },
  ];
  const poopAmount = useTamagi().tamagi.poop.amount;
  let p = [];
  for (let i = 0; i < poopAmount && i < 3; i++) {
    p.push(
      <div
        className="absolute w-[48px] h-[48px] poop"
        style={{
          bottom: `${poopPositionsByIndex[i].y}px`,
          left: `${poopPositionsByIndex[i].x}px`,
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
  }

  return p;
}

export type TamagiProps = {};
