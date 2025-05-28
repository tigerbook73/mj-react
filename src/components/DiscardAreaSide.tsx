import GameTile, { type GameTileProp } from "./GameTile";
import { CommonUtil, Direction } from "@/lib/direction";
import useMJStore from "@/stores/mj-store";
import { Position } from "@/common/core/mj.game";
import { cn } from "@/lib/utils";
import { TileCore } from "@/common/core/mj.tile-core";

interface DiscardAreaProps {
  direction: Direction;
}

export default function DiscardAreaSide({ direction }: DiscardAreaProps) {
  const myPosition = useMJStore((state) => state.myPosition);
  const currentGame = useMJStore((state) => state.currentGame);
  const discardTiles =
    currentGame?.discards[CommonUtil.mapPosition(myPosition ?? Position.None, direction)].tiles ?? [];

  const size = "sm";
  const rowLength = 12;

  const firstRowStartIndex = direction === Direction.Bottom || direction === Direction.Right ? 0 : rowLength;
  const firstRow = CommonUtil.extendArrayToLength(
    discardTiles.slice(firstRowStartIndex, firstRowStartIndex + rowLength),
    rowLength,
    TileCore.voidId
  ).map(
    (tileId): GameTileProp => ({
      tileId: tileId,
      direction,
      size,
      back: false,
      selected: false,
    })
  );

  const startIndex = direction === Direction.Bottom || direction === Direction.Right ? rowLength : 0;
  const secondRow = CommonUtil.extendArrayToLength(
    discardTiles.slice(startIndex, startIndex + rowLength),
    rowLength,
    TileCore.voidId
  ).map(
    (tileId): GameTileProp => ({
      tileId: tileId,
      direction,
      size,
      back: false,
      selected: false,
    })
  );

  return (
    <div
      className={cn("size-full flex items-center justify-center", {
        "flex-row": direction === Direction.Left || direction === Direction.Right,
        "flex-col": direction === Direction.Top || direction === Direction.Bottom,
      })}
    >
      <div
        className={cn("flex", {
          "flex-row": direction === Direction.Bottom,
          "flex-row-reverse": direction === Direction.Top,
          "flex-col-reverse": direction === Direction.Right,
          "flex-col": direction === Direction.Left,
        })}
      >
        {firstRow.map((tile, index) => (
          <GameTile key={index} tile={tile} />
        ))}
      </div>
      <div
        className={cn("flex", {
          "flex-row": direction === Direction.Bottom,
          "flex-row-reverse": direction === Direction.Top,
          "flex-col-reverse": direction === Direction.Right,
          "flex-col": direction === Direction.Left,
        })}
      >
        {secondRow.map((tile, index) => (
          <GameTile key={index} tile={tile} />
        ))}
      </div>
    </div>
  );
}
