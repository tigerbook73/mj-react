import { TileCore } from "@/common/core/mj.tile-core";
import GameTile from "@/components/GameTile";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Direction } from "@/lib/direction";
import { useState } from "react";

import { Button as MUIButton } from "@mui/material";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>Test Page</div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <GameTile tile={{ tileId: 10, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
          <GameTile tile={{ tileId: 10, back: false, selected: false, size: "md", direction: Direction.Top }} />
          <GameTile tile={{ tileId: 10, back: false, selected: false, size: "md", direction: Direction.Left }} />
          <GameTile tile={{ tileId: 10, back: false, selected: false, size: "md", direction: Direction.Right }} />

          <GameTile tile={{ tileId: 20, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
          <GameTile tile={{ tileId: 20, back: true, selected: false, size: "md", direction: Direction.Bottom }} />

          <GameTile tile={{ tileId: 30, back: false, selected: false, size: "md", direction: Direction.Bottom }} />
          <GameTile tile={{ tileId: 30, back: false, selected: true, size: "md", direction: Direction.Bottom }} />

          <GameTile tile={{ tileId: 40, back: false, selected: false, size: "xs", direction: Direction.Top }} />
          <GameTile tile={{ tileId: 40, back: false, selected: false, size: "sm", direction: Direction.Top }} />
          <GameTile tile={{ tileId: 40, back: false, selected: false, size: "md", direction: Direction.Top }} />
          <GameTile tile={{ tileId: 40, back: false, selected: false, size: "lg", direction: Direction.Top }} />
          <GameTile tile={{ tileId: 40, back: false, selected: false, size: "xl", direction: Direction.Top }} />

          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 1, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 2, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 3, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 4, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 5, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 6, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 7, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 8, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 9, direction: Direction.Top }} />
          <GameTile tile={{ tileId: 50, back: false, selected: false, size: 10, direction: Direction.Top }} />
        </div>
        <div className="my-4">
          <Label>
            <span>Open</span>
            <Switch checked={open} onCheckedChange={() => setOpen(!open)} />
          </Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {TileCore.allTiles.map((tile) => (
            <GameTile
              key={tile.id}
              tile={{
                tileId: tile.id,
                back: open,
                selected: false,
                size: "md",
                direction: Direction.Bottom,
              }}
            />
          ))}
        </div>
      </div>

      <div>============ MUI Example ============</div>
      <div className="flex gap-2">
        <MUIButton variant="contained" color="primary">
          Primary
        </MUIButton>
        <MUIButton variant="contained" color="secondary">
          Secondary
        </MUIButton>
        <MUIButton variant="contained" color="success">
          Success
        </MUIButton>
        <MUIButton variant="contained" color="error">
          Error
        </MUIButton>
        <MUIButton variant="contained" color="info">
          Info
        </MUIButton>
        <MUIButton variant="contained" color="warning">
          Warning
        </MUIButton>
      </div>
    </div>
  );
}
