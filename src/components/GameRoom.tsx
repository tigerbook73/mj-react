import useMJStore, { type RoomModelInStore, type SeatModelInStore } from "@/stores/mj-store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import GameSeat from "./GameSeat";
import { Position } from "@/common/core/mj.game";
import { PlayerRole, UserType } from "@/common/models/common.types";
import { RoomStatus } from "@/common/models/room.model";
import { clientApi } from "@/client/client-api";
import { toast } from "sonner";

interface GameRoomProps {
  room: RoomModelInStore;
  className?: string;
}

export default function GameRoom({ room, className, ...props }: GameRoomProps & React.ComponentProps<"div">) {
  const currentRoom = useMJStore((state) => state.currentRoom);
  const currentPosition = useMJStore((state) => state.currentPosition);

  const nonPlayer = {
    userName: "",
    roomName: room.name,
    role: PlayerRole.Player,
    type: UserType.Human,
    position: Position.East,
  };
  const southPlayer = room.players.find((player) => player.position === Position.South) || {
    ...nonPlayer,
    position: Position.South,
  };
  const eastPlayer = room.players.find((player) => player.position === Position.East) || {
    ...nonPlayer,
    position: Position.East,
  };
  const westPlayer = room.players.find((player) => player.position === Position.West) || {
    ...nonPlayer,
    position: Position.West,
  };
  const northPlayer = room.players.find((player) => player.position === Position.North) || {
    ...nonPlayer,
    position: Position.North,
  };

  async function handlePlayerClick(seat: SeatModelInStore) {
    if (room.state !== RoomStatus.Open) {
      return;
    }

    // already at the position
    if (currentRoom?.name == room.name && currentPosition === seat.position) {
      try {
        await clientApi.leaveRoom(room.name);
      } catch (error) {
        toast.warning("Failed to leave room");
        console.error("Failed to leave room", error);
      }
      return;
    }

    // position is occupied
    if (seat.type === UserType.Human) {
      toast.warning("Seat is occupied");
      return;
    }

    // position is available
    if (seat.type === UserType.Bot) {
      if (currentPosition !== null) {
        // if the player is currently in a room, leave it
        try {
          await clientApi.leaveRoom(currentRoom!.name);
        } catch (error) {
          toast.warning("Failed to leave current room");
          console.error("Failed to leave current room", error);
          return;
        }
      }

      // join the new room
      try {
        await clientApi.joinRoom(room.name, seat.position);
      } catch (error) {
        toast.warning("Failed to join room");
        console.error("Failed to join room", error);
      }
      return;
    }
  }

  async function handleEnterGame() {
    if (!currentRoom) {
      toast.warning("Please join a room first");
      return;
    }
    try {
      await clientApi.enterGame(room.name);
    } catch (error) {
      toast.warning("Failed to enter game");
      console.error("Failed to enter game", error);
    }
  }

  return (
    <div className={cn("w-full h-full flex flex-col bg-blue-3 text-center bg-gray-100", className)} {...props}>
      {/* top */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4" onDoubleClick={() => handlePlayerClick(northPlayer)}>
          <GameSeat seat={northPlayer} />
        </div>
        <div className="flex-1" />
      </div>

      {/* <!-- middle --> */}
      <div className="h-2/4 flex ">
        {/* <!-- left --> */}
        <div className="w-1/4" onDoubleClick={() => handlePlayerClick(westPlayer)}>
          <GameSeat seat={westPlayer} />
        </div>

        {/* <!-- center --> */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-green-300">
          <div className="m-2 py-1 px-2 rounded-sm text-md bg-pink-400">{room.name}</div>
          <Button onClick={handleEnterGame}>Enter Game</Button>
        </div>

        {/* <!-- right --> */}
        <div className="w-1/4" onDoubleClick={() => handlePlayerClick(eastPlayer)}>
          <GameSeat seat={eastPlayer} />
        </div>
      </div>

      {/* <!-- bottom --> */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4" onDoubleClick={() => handlePlayerClick(southPlayer)}>
          <GameSeat seat={southPlayer} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}
