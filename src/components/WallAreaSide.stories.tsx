import type { Meta, StoryObj } from "@storybook/react-vite";

import WallAreaSide from "./WallAreaSide";
import { Direction } from "@/lib/direction";
import useMJStore, { AppState } from "@/stores/mj-store";
import { Game, Position } from "@/common/core/mj.game";

const meta = {
  title: "Components/WallAreaSide",
  component: WallAreaSide,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      // 初始化 store 状态

      const game = new Game();
      game.init([Position.East, Position.South, Position.West, Position.North]);

      useMJStore.setState({
        appState: AppState.Unconnected,
        connected: false,
        user: {
          email: "example@email.com",
          password: "",
        },
        signedIn: false,
        roomList: [],
        myRoom: null,
        myPosition: Position.East,
        currentGame: game,
        open: true,
      });

      return <Story />;
    },
  ],
  argTypes: {
    direction: {
      control: {
        type: "select",
        labels: {
          [Direction.Top]: "Top",
          [Direction.Bottom]: "Bottom",
          [Direction.Left]: "Left",
          [Direction.Right]: "Right",
        },
      },
      options: [Direction.Top, Direction.Bottom, Direction.Left, Direction.Right],
    },
  },
} satisfies Meta<typeof WallAreaSide>;

export default meta;

type Story = StoryObj<typeof meta>;

function OpenControl() {
  const setOpen = useMJStore((s) => s.setOpen);
  const open = useMJStore((s) => s.open);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.target.checked);
  };

  return (
    <div className="m-2">
      <label>
        <span className="mr-1">open</span>
        <input type="checkbox" checked={open} onChange={handleChange} />
      </label>
    </div>
  );
}

export const Default: Story = {
  args: {
    direction: Direction.Bottom,
  },
  render: (args) => {
    return (
      <div className="w-full flex flex-row justify-between">
        <OpenControl />
        <WallAreaSide {...args} />
      </div>
    );
  },
};

export const Multiple: Story = {
  args: {
    direction: Direction.Bottom,
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <WallAreaSide direction={Direction.Top} />
      <div className="flex justify-between items-center">
        <div>
          <WallAreaSide direction={Direction.Left} />
        </div>
        <div>
          <WallAreaSide direction={Direction.Right} />
        </div>
      </div>
      <WallAreaSide direction={Direction.Bottom} />
    </div>
  ),
};
