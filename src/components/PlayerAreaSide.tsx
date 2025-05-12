import { Position } from "@/common/core/mj.game";
import { CommonUtil, type Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";
import useMJStore from "@/stores/mj-store";
import type React from "react";

export default function PlayerAreaSide({
  direction,
  className,
  ...props
}: { direction: Direction } & React.ComponentProps<"div">) {
  const myPosition = useMJStore((state) => state.myPosition);
  const currentPlayerPosition = useMJStore((state) => state.currentGame?.current?.position);

  // this player's position
  const position = CommonUtil.mapPosition(myPosition ?? Position.None, direction);
  const positionText = CommonUtil.positionToText(position);

  return (
    <div
      className={cn(
        "h-full w-full flex flex-col justify-center items-center",
        position === currentPlayerPosition ? "bg-green-500" : "bg-green-800",
        className
      )}
      {...props}
    >
      <div>{direction}</div>
      <div>{positionText}</div>
    </div>
  );
}
