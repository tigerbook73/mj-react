import type { Meta, StoryObj } from "@storybook/react-vite";

import GamePage from "./GamePage";
import { Game, Position } from "@/common/core/mj.game";
import useMJStore, { AppState } from "@/stores/mj-store";

const meta = {
  title: "Pages/GamePage",
  component: GamePage,
  parameters: {
    layout: "fullscreen",
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
} satisfies Meta<typeof GamePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
