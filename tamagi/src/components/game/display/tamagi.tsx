/* eslint-disable @next/next/no-img-element */
"use client";
import cn from "classnames";
import "./tamagi.css";
import { useTamagi } from "@/stores/tamagi";

export default function Tamagi(props: TamagiProps) {
  const spritePostion = useTamagi().tamagi.type.sprite.position;
  const currentAnimation = useTamagi().animation.type;

  return (
    <div className="bg-green-500 h-[200px] w-[200px]">
      <div className="h-[160px] w-[160px] relative m-auto">
        <div
          className={cn(
            "absolute h-[48px] w-[48px] top-[calc(50%-24px)] left-[calc(50%-24px)]",
            currentAnimation
          )}
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
      </div>
    </div>
  );
}

export type TamagiProps = {};
