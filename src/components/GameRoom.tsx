import { type RoomModelInStore } from "@/stores/mj-store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import GameSeat from "./GameSeat";
import { Position } from "@/common/core/mj.game";

interface GameRoomProps {
  room: RoomModelInStore;
  className?: string;
}

export default function GameRoom({ room, className, ...props }: GameRoomProps & React.ComponentProps<"div">) {
  return (
    <div className={cn("w-full h-full flex flex-col bg-blue-3 text-center bg-gray-100", className)} {...props}>
      {/* top */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4">
          <GameSeat seat={room.players.find((player) => player.position === Position.North)!} />
        </div>
        <div className="flex-1" />
      </div>

      {/* <!-- middle --> */}
      <div className="h-2/4 flex ">
        {/* <!-- left --> */}
        <div className="w-1/4">
          <GameSeat seat={room.players.find((player) => player.position === Position.West)!} />
        </div>

        {/* <!-- center --> */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-green-300">
          <div className="m-2 py-1 px-2 rounded-sm text-md bg-pink-400">{room.name}</div>
          <Button>Enter Game</Button>
        </div>

        {/* <!-- right --> */}
        <div className="w-1/4">
          <GameSeat seat={room.players.find((player) => player.position === Position.East)!} />
        </div>
      </div>

      {/* <!-- bottom --> */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4">
          <GameSeat seat={room.players.find((player) => player.position === Position.South)!} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}
