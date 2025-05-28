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
  argTypes: {
    tile: {},
  },
} satisfies Meta<typeof GameTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1 justify-left">
        {
          // Display the tile with the back side
          TileCore.allTiles
            .filter((_, index) => index % 4 === 0)
            .map((tile) => (
              <GameTile key={tile.id} {...args} tile={{ ...args.tile, id: tile.id, size: "lg" }} />
            ))
        }
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {
          // Display the tile with the back side
          [false, true].map((back, index) => (
            <GameTile key={index} {...args} tile={{ ...args.tile, id: args.tile.id + index * 4, back }} />
          ))
        }
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {
          // Display the tile with the back side
          [Direction.Bottom, Direction.Top, Direction.Left, Direction.Right].map((direction, index) => (
            <GameTile key={direction} {...args} tile={{ ...args.tile, id: args.tile.id + index * 4, direction }} />
          ))
        }
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {
          // Display different sizes of the GameTile
          ["xs", "sm", "md", "lg", "xl"].map((size, index) => (
            <div key={size} className="flex flex-col items-center">
              <div>{size}</div>
              <GameTile {...args} tile={{ ...args.tile, id: args.tile.id + index * 4, size: size as any }} />
            </div>
          ))
        }
      </div>
      <div className="flex flex-wrap gap-4 justify-left">
        {
          // Display different sizes of the GameTile
          Array.from({ length: 9 }, (_, i) => i + 1).map((size, index) => (
            <div key={size} className="flex flex-col items-center">
              <div>{size}</div>
              <GameTile {...args} tile={{ ...args.tile, id: args.tile.id + index * 4, size: size as any }} />
            </div>
          ))
        }
      </div>
    </div>
  ),
  args: {
    tile: {
      id: 1,
      back: false,
      selected: false,
      size: "xl",
      direction: Direction.Bottom,
    },
  },
};

export const Standard: Story = {
  args: {
    tile: {
      id: 1,
      back: false,
      selected: false,
      size: 5,
      direction: Direction.Bottom,
    },
  },
};
