import useMJStore from "@/stores/mj-store";

export default function LobbyPage() {
  const roomList = useMJStore((state) => state.roomList);

  return (
    <div className="row justify-center">
      <div className="w-1/3">
        <div className="row justify-center items-center gap-4">
          {"Lobby "}
          {roomList.map((room) => (
            <div key={room.name} className="w-full md:w-1/2 xl:w-1/3 ratio-1/1">
              <div>{room.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
