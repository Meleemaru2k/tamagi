/* eslint-disable @next/next/no-img-element */
"use client";
import cn from "classnames";
import "./tamagi.css";
import { useTamagi } from "@/stores/tamagi";
import Poop from "../status/poop";
import Sick from "../status/sick";
import Food from "../status/food";

export default function Tamagi(props: TamagiProps) {
  const spritePostion = useTamagi().tamagi.type.sprite.position;
  const currentAnimation = useTamagi().animation.type;
  return (
    <div className="bg-white h-[200px] w-[200px] flex relative overflow-hidden rounded-md border-2 border-solid border-slate-300">
      <img
        alt="bg"
        className="absolute h-full w-auto scale-[2] object-cover "
        src="/bg_meadow.png"
        style={{ transformOrigin: "0 195px", imageRendering: "pixelated" }}
      ></img>
      <div className="h-[160px] w-[160px] relative m-auto z-10">
        <Poop />
        <div
          className={cn(
            "absolute h-[48px] w-[48px] top-[calc(90%-24px)] left-[calc(50%-24px)] flex flex-row flex-nowrap overflow-visible",
            currentAnimation
          )}
        >
          <div id="tamagiBody" className="relative w-full h-full m-auto">
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
          <Sick />
          <Food />
        </div>
      </div>
    </div>
  );
}

export type TamagiProps = {};
