import { Position } from "@/common/core/mj.game";
import { CommonUtil, type Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";
import useMJStore from "@/stores/mj-store";
import type React from "react";

export default function PlayerAreaHand({
  direction,
  className,
  ...props
}: { direction: Direction } & React.ComponentProps<"div">) {
  const myPosition = useMJStore((state) => state.currentPosition);
  const currentPlayerPosition = useMJStore((state) => state.currentGame?.current?.position);

  const currentPlayerDirection = CommonUtil.mapDirection(
    myPosition ?? Position.None,
    currentPlayerPosition ?? Position.None
  );

  return (
    <div
      className={cn(
        "h-full w-full flex flex-col justify-center items-center",
        direction === currentPlayerDirection ? "bg-green-500" : "bg-green-800",
        className
      )}
      {...props}
    >
      {direction}
    </div>
  );
}
