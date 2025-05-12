import { GameState, Position } from "@/common/core/mj.game";
import { clientApi } from "@/client/client-api";
import useMJStore from "@/stores/mj-store";
import { CommonUtil, Direction } from "@/lib/direction";
import { toast } from "sonner";
import { Button } from "./ui/button";

const commandMap = {
  [GameState.Init]: "start",
  [GameState.Dispatching]: "reset",
  [GameState.WaitingAction]: "reset",
  [GameState.WaitingPass]: "reset",
  [GameState.End]: "reset",
};

export default function CenterArea() {
  const myPosition = useMJStore((state) => state.myPosition ?? Position.None);
  const currentGame = useMJStore((state) => state.currentGame);

  const topLabel = CommonUtil.positionToText(CommonUtil.mapPosition(myPosition, Direction.Top));
  const bottomLabel = CommonUtil.positionToText(CommonUtil.mapPosition(myPosition, Direction.Bottom));
  const leftLabel = CommonUtil.positionToText(CommonUtil.mapPosition(myPosition, Direction.Left));
  const rightLabel = CommonUtil.positionToText(CommonUtil.mapPosition(myPosition, Direction.Right));

  // Command buttons
  const btnCommand = !currentGame?.state ? "" : commandMap[currentGame.state] || "reset";

  const handleStart = () => {
    try {
      clientApi.startGame();
    } catch (e) {
      toast.error("Game start failed");
      console.error("Game start failed", e);
    }
  };

  const handleReset = () => {
    try {
      clientApi.resetGame();
    } catch (e) {
      toast.error("Game reset failed");
      console.error("Game reset failed", e);
    }
  };

  return (
    <div className="size-full flex flex-col bg-green-500">
      {/* Top */}
      <div className="flex-1 flex flex-row justify-center items-center">
        <div className="flex-1" />
        <div className="p-2 aspect-square bg-yellow-100 rounded">
          <div className="rotate-180">{topLabel}</div>
        </div>
        <div className="flex-1" />
      </div>

      {/* Center */}
      <div className="h-2/4 flex flex-row justify-center items-center">
        <div className="flex-1 flex justify-center items-center">
          <div className="p-2 aspect-square bg-yellow-100 rounded">
            <div className="rotate-90">{leftLabel}</div>
          </div>
        </div>
        <div className="w-2/4 flex flex-row justify-center items-center">
          {btnCommand === "start" ? (
            <Button onClick={handleStart}>Start</Button>
          ) : (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="p-2 aspect-square bg-yellow-100 rounded">
            <div className="rotate-270">{rightLabel}</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex-1 flex flex-row justify-center items-center">
        <div className="flex-1" />
        <div className="p-2 aspect-square bg-yellow-100 rounded">
          <div>{bottomLabel}</div>
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}
