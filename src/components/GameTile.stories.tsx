import type { Meta, StoryObj } from "@storybook/react-vite";

import GameTile from "../components/GameTile";
import { Direction } from "@/lib/direction";
import { TileCore } from "@/common/core/mj.tile-core";

const meta = {
  component: GameTile,
  title: "Components/GameTile",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GameTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1 justify-left">
        {/* display all tiles */}
        {TileCore.allTiles
          .filter((_, index) => index % 4 === 0)
          .map((tile) => (
            <GameTile key={tile.id} {...args} tileId={tile.id} size="lg" />
          ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {/* display front and back tiles */}
        {[false, true].map((selected, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-3">{selected ? "selected" : "unselected"}</div>
            <GameTile key={index} {...args} selected={selected} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {[false, true].map((back, index) => (
          <div key={index} className="flex flex-col items-center">
            <div>{back ? "Back" : "Front"}</div>
            <GameTile key={index} {...args} back={back} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {[Direction.Bottom, Direction.Top, Direction.Left, Direction.Right].map((direction, index) => (
          <div key={direction} className="flex flex-col items-center">
            <div>{direction}</div>
            <GameTile key={direction} {...args} tileId={args.tileId + index * 4} direction={direction} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {["xs", "sm", "md", "lg", "xl"].map((size, index) => (
          <div key={size} className="flex flex-col items-center">
            <div>{size}</div>
            <GameTile {...args} tileId={args.tileId + index * 4} size={size as any} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((size, index) => (
          <div key={size} className="flex flex-col items-center">
            <div>{size}</div>
            <GameTile {...args} tileId={args.tileId + index * 4} size={size as any} />
          </div>
        ))}
      </div>
    </div>
  ),
  args: {
    tileId: 1,
    back: false,
    selected: false,
    size: "xl",
    direction: Direction.Bottom,
  },
};

export const Standard: Story = {
  args: {
    tileId: 1,
    back: false,
    selected: false,
    size: 5,
    direction: Direction.Bottom,
  },
};
