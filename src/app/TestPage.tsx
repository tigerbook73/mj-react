import GameTile from "@/components/GameTile";
import { Direction } from "@/lib/direction";

export default function TestPage() {
  return (
    <div>
      <div>Test Page</div>
      <div className="flex gap-2">
        <GameTile tile={{ id: 10, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
        <GameTile tile={{ id: 10, back: false, selected: false, size: "md", direction: Direction.Top }} />
        <GameTile tile={{ id: 10, back: false, selected: false, size: "md", direction: Direction.Left }} />
        <GameTile tile={{ id: 10, back: false, selected: false, size: "md", direction: Direction.Right }} />

        <GameTile tile={{ id: 20, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
        <GameTile tile={{ id: 20, back: true, selected: false, size: "md", direction: Direction.Bottom }} />

        <GameTile tile={{ id: 30, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
        <GameTile tile={{ id: 30, back: false, selected: true, size: "md", direction: Direction.Bottom }} />

        <GameTile tile={{ id: 40, back: false, selected: false, size: "xs", direction: Direction.Top }} />
        <GameTile tile={{ id: 40, back: false, selected: false, size: "sm", direction: Direction.Top }} />
        <GameTile tile={{ id: 40, back: false, selected: false, size: "md", direction: Direction.Top }} />
        <GameTile tile={{ id: 40, back: false, selected: false, size: "lg", direction: Direction.Top }} />
        <GameTile tile={{ id: 40, back: false, selected: false, size: "xl", direction: Direction.Top }} />

        <GameTile tile={{ id: 50, back: false, selected: false, size: 1, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 2, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 3, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 4, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 5, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 6, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 7, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 8, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 9, direction: Direction.Top }} />
        <GameTile tile={{ id: 50, back: false, selected: false, size: 10, direction: Direction.Top }} />
      </div>
    </div>
  );
}
