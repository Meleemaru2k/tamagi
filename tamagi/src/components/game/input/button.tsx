"use client";

import { useEffect, useState } from "react";
import cn from "classnames";

export default function Button(props: ButtonProps) {
  let buttonText = props.buttonText;
  let buttonType = props.buttonType;
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  });

  const buttonStyle = () => {
    switch (buttonType) {
      case "PRIMARY":
        return "bg-blue-500 text-white";
      case "SECONDARY":
        return "bg-teal-500 text-white";
      case "WARNING":
        return "bg-yellow-500 text-black";
      case "DANGER":
        return "bg-red-500 text-white";
      case "SUCCESS":
        return "bg-green-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <div className="flex">
      <button
        className={cn(
          buttonStyle(),
          "px-2 py-1 rounded-sm border-[1px] border-teal-700 transition-all"
        )}
        onClick={() => setIsLoading(true)}
      >
        {buttonText}
        {isLoading ? " - now loading" : ""}
      </button>
    </div>
  );
}

export type ButtonProps = {
  buttonText: string;
  buttonType?: "PRIMARY" | "SECONDARY" | "WARNING" | "DANGER" | "SUCCESS";
};
