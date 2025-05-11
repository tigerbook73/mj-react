import GameRoom from "@/components/GameRoom";
import useMJStore from "@/stores/mj-store";

export default function LobbyPage() {
  const roomList = useMJStore((state) => state.roomList);

  return (
    <div className="flex flex-row justify-center gap-4 w-full flex-wrap">
      {roomList.map((room) => (
        <div key={room.name} className="w-19/20 sm:w-9/20 md:w-100 aspect-square rounded-lg shadow-md">
          <GameRoom room={room} className="w-full h-full"></GameRoom>
        </div>
      ))}
    </div>
  );
}
