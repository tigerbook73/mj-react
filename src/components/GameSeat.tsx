import { cn } from "@/lib/utils";
import { Position } from "@/common/core/mj.game";
import type { SeatModelInStore } from "@/stores/mj-store";
import React from "react";

export type GameSeatProp = SeatModelInStore;

const positionMap = {
  [Position.East]: "東",
  [Position.West]: "西",
  [Position.North]: "北",
  [Position.South]: "南",
  [Position.None]: "",
};

export default React.memo(function GameSeat({
  position,
  userName,
  className,
}: GameSeatProp & React.ComponentProps<"div">) {
  const positionName = positionMap[position];
  return (
    <div className={cn("h-full w-full flex flex-col justify-center items-center bg-blue-100", className)}>
      <div className="m-2 px-2 py-1 rounded-md shadow-md bg-yellow-400">{positionName}</div>
      <div className="m-2">{userName}</div>
    </div>
  );
});
