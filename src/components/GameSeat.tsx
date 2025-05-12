import { cn } from "@/lib/utils";
import { Position } from "@/common/core/mj.game";
import type { SeatModelInStore } from "@/stores/mj-store";

export interface GameSeatProp {
  seat: SeatModelInStore;
}

const positionMap = {
  [Position.East]: "東",
  [Position.West]: "西",
  [Position.North]: "北",
  [Position.South]: "南",
  [Position.None]: "",
};

export default function GameSeat({ seat, className, ...props }: GameSeatProp & React.ComponentProps<"div">) {
  const positionName = positionMap[seat.position];
  return (
    <div className={cn("h-full w-full flex flex-col justify-center items-center bg-red-100", className)} {...props}>
      <div className="m-2 px-2 py-1 rounded-md shadow-md bg-yellow-400">{positionName}</div>
      <div className="m-2">{seat.userName}</div>
    </div>
  );
}
