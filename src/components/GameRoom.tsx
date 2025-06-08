import useMJStore, { type RoomModelInStore, type SeatModelInStore } from "@/stores/mj-store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import GameSeat from "./GameSeat";
import { Position } from "@/common/core/mj.game";
import { PlayerRole, UserType } from "@/common/models/common.types";
import { RoomStatus } from "@/common/models/room.model";
import { clientApi } from "@/client/client-api";
import { toast } from "sonner";
import React from "react";

interface GameRoomProps {
  room: RoomModelInStore;
  className?: string;
}

const nonPlayer = {
  userName: "",
  roomName: "",
  role: PlayerRole.Player,
  type: UserType.Human,
  position: Position.East,
};

const findPlayerByPosition = (room: RoomModelInStore, position: Position): SeatModelInStore => {
  return (
    room.players.find((player) => player.position === position) || {
      ...nonPlayer,
      roomName: room.name,
      position: position,
    }
  );
};

export default React.memo(function GameRoom({
  room,
  className,
  ...props
}: GameRoomProps & React.ComponentProps<"div">) {
  const myRoom = useMJStore((state) => state.myRoom);
  const myPosition = useMJStore((state) => state.myPosition);

  const southPlayer = findPlayerByPosition(room, Position.South);
  const eastPlayer = findPlayerByPosition(room, Position.East);
  const westPlayer = findPlayerByPosition(room, Position.West);
  const northPlayer = findPlayerByPosition(room, Position.North);

  async function handlePlayerClick(seat: SeatModelInStore) {
    if (room.state !== RoomStatus.Open) {
      return;
    }

    // already at the position
    if (myRoom?.name == room.name && myPosition === seat.position) {
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
      if (myPosition !== null) {
        // if the player is currently in a room, leave it
        try {
          await clientApi.leaveRoom(myRoom!.name);
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
    if (!myRoom) {
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
    <div className={cn("w-full h-full flex flex-col bg-blue-3 text-center bg-blue-200", className)} {...props}>
      {/* top */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4" onDoubleClick={() => handlePlayerClick(northPlayer)}>
          <GameSeat {...northPlayer} />
        </div>
        <div className="flex-1" />
      </div>

      {/* <!-- middle --> */}
      <div className="h-2/4 flex ">
        {/* <!-- left --> */}
        <div className="w-1/4" onDoubleClick={() => handlePlayerClick(westPlayer)}>
          <GameSeat {...westPlayer} />
        </div>

        {/* <!-- center --> */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-green-300">
          <div className="m-2 py-1 px-2 rounded-sm text-md bg-pink-400">{room.name}</div>
          <Button onClick={handleEnterGame}>Enter Game</Button>
        </div>

        {/* <!-- right --> */}
        <div className="w-1/4" onDoubleClick={() => handlePlayerClick(eastPlayer)}>
          <GameSeat {...eastPlayer} />
        </div>
      </div>

      {/* <!-- bottom --> */}
      <div className="h-1/4 flex ">
        <div className="flex-1" />
        <div className="w-2/4" onDoubleClick={() => handlePlayerClick(southPlayer)}>
          <GameSeat {...southPlayer} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
});
