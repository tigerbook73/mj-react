import { TileCore, type TileId } from "@/common/core/mj.tile-core";
import { Direction } from "@/lib/direction";
import { cn } from "@/lib/utils";

export interface GameTileProp {
  id: TileId;
  direction: Direction;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  back?: boolean;
  selected?: boolean;
}

const imageNames: Record<string, string> = {
  一条: "Sou1.svg",
  二条: "Sou2.svg",
  三条: "Sou3.svg",
  四条: "Sou4.svg",
  五条: "Sou5.svg",
  六条: "Sou6.svg",
  七条: "Sou7.svg",
  八条: "Sou8.svg",
  九条: "Sou9.svg",
  一筒: "Pin1.svg",
  二筒: "Pin2.svg",
  三筒: "Pin3.svg",
  四筒: "Pin4.svg",
  五筒: "Pin5.svg",
  六筒: "Pin6.svg",
  七筒: "Pin7.svg",
  八筒: "Pin8.svg",
  九筒: "Pin9.svg",
  一万: "Man1.svg",
  二万: "Man2.svg",
  三万: "Man3.svg",
  四万: "Man4.svg",
  五万: "Man5.svg",
  六万: "Man6.svg",
  七万: "Man7.svg",
  八万: "Man8.svg",
  九万: "Man9.svg",
  东: "Ton.svg",
  南: "Nan.svg",
  西: "Shaa.svg",
  北: "Pei.svg",
  中: "Chun.svg",
  发: "Hatsu.svg",
  白: "Haku.svg",
};

const sizeMap = {
  xs: 2.8,
  sm: 3,
  md: 3.5,
  lg: 4,
  xl: 5,
};

// tile class group
const clsTile = "bg-gray-200 border border-black rounded-sm shadow-md hover:filter hover:invert";
const clsTileBack = "bg-gray-500 border border-black rounded-sm shadow-md";
const clsTileSelected = "relative top-[-8px]";

// image class group
const clsImageTop = "transform rotate-180";
const clsImageBottom = "transform rotate-0";
const clsImageLeft = "transform rotate-90";
const clsImageRight = "transform rotate-[-90deg]";

export default function GameTile({ tile, ...props }: { tile: GameTileProp } & React.ComponentProps<"div">) {
  const name = TileCore.fromId(tile.id).name;
  const imgSrc = imageNames[name] ? `/svgs/Regular/${imageNames[name]}` : "/svgs/Black/Blank.svg";
  const showImage = tile.id !== TileCore.voidId && !tile.back;
  const size = typeof tile.size === "number" ? tile.size : sizeMap[tile.size || "md"];
  const width = `${size}vmin`;
  const height = `${(size * 4) / 3}vmin`;

  const tileClass = cn(
    "flex justify-center items-center",
    tile.id !== TileCore.voidId && !tile.back && clsTile,
    tile.id !== TileCore.voidId && tile.back && clsTileBack,
    tile.selected && clsTileSelected
  );

  const tileStyle = {
    width: tile.direction === Direction.Top || tile.direction === Direction.Bottom ? width : height,
    height: tile.direction === Direction.Top || tile.direction === Direction.Bottom ? height : width,
  };

  const imageClass = cn(
    "size-90/100",
    tile.direction === Direction.Top && clsImageTop,
    tile.direction === Direction.Bottom && clsImageBottom,
    tile.direction === Direction.Left && clsImageLeft,
    tile.direction === Direction.Right && clsImageRight
  );

  return (
    <div className={tileClass} style={tileStyle} {...props}>
      {showImage && <img src={imgSrc} className={imageClass} />}
    </div>
  );
}
