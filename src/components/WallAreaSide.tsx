import GameTile, { type GameTileProp } from "./GameTile";
import { CommonUtil, Direction } from "@/lib/direction";
import useMJStore from "@/stores/mj-store";
import { Position } from "@/common";
import { cn } from "@/lib/utils";

interface WallAreaProps {
  direction: Direction;
}

export default function WallAreaSide({ direction }: WallAreaProps) {
  const open = useMJStore((state) => state.open);
  const myPosition = useMJStore((state) => state.myPosition);
  const currentGame = useMJStore((state) => state.currentGame);
  const wallTiles = currentGame?.walls[CommonUtil.mapPosition(myPosition ?? Position.None, direction)].tiles ?? [];

  const size = "sm";

  const firstRow = (() => {
    const remainder = direction === Direction.Bottom || direction === Direction.Right ? 0 : 1;
    return wallTiles
      .filter((_, i) => i % 2 === remainder)
      .map(
        (tileId): GameTileProp => ({
          tileId: tileId,
          direction,
          size,
          back: !open,
          selected: false,
        }),
      );
  })();

  const secondRow = (() => {
    const remainder = direction === Direction.Bottom || direction === Direction.Right ? 1 : 0;
    return wallTiles
      .filter((_, i) => i % 2 === remainder)
      .map(
        (tileId): GameTileProp => ({
          tileId: tileId,
          direction,
          size,
          back: !open,
          selected: false,
        }),
      );
  })();

  return (
    <div
      className={cn("size-full flex items-center justify-center bg-yellow-900", {
        "flex-col": direction === Direction.Top || direction === Direction.Bottom,
        "flex-row": direction === Direction.Left || direction === Direction.Right,
      })}
    >
      <div
        className={cn("flex", {
          "flex-row": direction === Direction.Top,
          "flex-row-reverse": direction === Direction.Bottom,
          "flex-col-reverse": direction === Direction.Left,
          "flex-col": direction === Direction.Right,
        })}
      >
        {firstRow.map((tile, index) => (
          <GameTile key={index} {...tile} />
        ))}
      </div>
      <div
        className={cn("flex", {
          "flex-row": direction === Direction.Top,
          "flex-row-reverse": direction === Direction.Bottom,
          "flex-col-reverse": direction === Direction.Left,
          "flex-col": direction === Direction.Right,
        })}
      >
        {secondRow.map((tile, index) => (
          <GameTile key={index} {...tile} />
        ))}
      </div>
    </div>
  );
}
