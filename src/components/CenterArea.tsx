import { GameState, Position } from "@/common";
import useMJStore from "@/stores/mj-store";
import { CommonUtil, Direction } from "@/lib/direction";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { socketClient } from "@/client/socket-client";

const commandMap = {
  [GameState.Init]: "start",
  [GameState.Dispatching]: "reset",
  [GameState.WaitingAction]: "reset",
  [GameState.WaitingPass]: "reset",
  [GameState.End]: "reset",
};

export default function CenterArea() {
  const myPosition = useMJStore((state) => state.myPosition) ?? Position.None;
  const currentGame = useMJStore((state) => state.currentGame);
  const playerList = useMJStore((state) => state.myRoom?.players) ?? [];

  const topPosition = CommonUtil.mapPosition(myPosition, Direction.Top);
  const topLabel = CommonUtil.positionToText(topPosition);
  const topUserName = playerList.find((player) => player.position === topPosition)?.userName ?? "";

  const bottomPosition = CommonUtil.mapPosition(myPosition, Direction.Bottom);
  const bottomLabel = CommonUtil.positionToText(bottomPosition);
  const bottomUserName = playerList.find((player) => player.position === bottomPosition)?.userName ?? "";

  const leftPosition = CommonUtil.mapPosition(myPosition, Direction.Left);
  const leftLabel = CommonUtil.positionToText(leftPosition);
  const leftUserName = playerList.find((player) => player.position === leftPosition)?.userName ?? "";

  const rightPosition = CommonUtil.mapPosition(myPosition, Direction.Right);
  const rightLabel = CommonUtil.positionToText(rightPosition);
  const rightUserName = playerList.find((player) => player.position === rightPosition)?.userName ?? "";

  // Command buttons
  const btnCommand = !currentGame?.state ? "" : commandMap[currentGame.state] || "reset";

  const handleStart = () => {
    try {
      socketClient.startGame();
    } catch (e) {
      toast.error("Game start failed");
      console.error("Game start failed", e);
    }
  };

  const handleReset = () => {
    try {
      socketClient.resetGame();
    } catch (e) {
      toast.error("Game reset failed");
      console.error("Game reset failed", e);
    }
  };

  const LabelAndUser = ({ label, user, className = "" }: { label: string; user: string; className?: string }) => (
    <div className="flex-1 flex justify-center">
      <div className={className}>
        <div className="p-2 aspect-square flex flex-row justify-center items-center bg-yellow-100 rounded">
          <div>{label}</div>
        </div>
        <div className="w-10 flex justify-center overflow-visible">
          <div className="whitespace-nowrap">{user}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="size-full flex flex-col bg-green-500">
      {/* Top */}
      <div className="flex-1 flex flex-row justify-center items-center">
        <div className="flex-1" />
        <LabelAndUser label={topLabel} user={topUserName} className="rotate-180" />
        <div className="flex-1" />
      </div>

      {/* Center */}
      <div className="h-2/4 flex flex-row justify-center items-center">
        <div className="flex-1 flex justify-center">
          <LabelAndUser label={leftLabel} user={leftUserName} className="rotate-90" />
        </div>

        <div className="w-2/4 flex flex-row justify-center items-center">
          {btnCommand === "start" ? (
            <Button onClick={handleStart}>Start</Button>
          ) : (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </div>

        <div className="flex-1 flex justify-center items-center">
          <LabelAndUser label={rightLabel} user={rightUserName} className="rotate-270" />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex-1 flex flex-row justify-center items-center">
        <div className="flex-1" />
        <LabelAndUser label={bottomLabel} user={bottomUserName} />
        <div className="flex-1" />
      </div>
    </div>
  );
}
