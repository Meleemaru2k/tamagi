/* eslint-disable @next/next/no-img-element */
"use client";
import cn from "classnames";
import { useTamagi } from "@/stores/tamagi";
import { getSpritePos } from "@/utils/utils";
import { SicknessTypes } from "@/utils/sickness";

export default function Sick() {
  const animation = useTamagi().animation.type;
  const sickType = useTamagi().tamagi.sick.type.id;
  const hasBeenHealed = useTamagi().tamagi.sick.timeHealed;
  const show =
    sickType !== SicknessTypes.Healthy &&
    !hasBeenHealed &&
    animation === "breathing";

  if (show) {
    return (
      <div className="absolute">
        <div className="absolute font-mono font-bold text-blue-600 top-[2px] left-[2px]">
          |||
        </div>
        <div className="absolute top-0 left-0 font-mono font-bold text-blue-200">
          |||
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export type TamagiProps = {};
