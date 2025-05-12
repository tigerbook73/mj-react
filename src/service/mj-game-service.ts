import { clientApi } from "@/client/client-api";
import type { GameEvent } from "@/common/protocols/apis.models";
import useMJStore from "@/stores/mj-store";

class MjGameService {
  boot(): void {
    const { setConnected } = useMJStore.getState();

    clientApi.gameSocket.onConnect(() => {
      setConnected(true);
      console.log(`[${new Date().toISOString()}] setConnected(true)`);
    });

    clientApi.gameSocket.onDisconnect(() => {
      setConnected(false);
      console.log(`[${new Date().toISOString()}] setConnected(false)`);
    });

    // game event
    clientApi.gameSocket.onReceive((event) => this.onReceive(event));
  }

  onReceive(event: GameEvent): void {
    const {
      //
      setRoomList,
      setCurrentRoom,
      setCurrentPosition,
      setCurrentGame,
    } = useMJStore.getState();

    event = clientApi.parseEvent(event);
    setRoomList(event.data.rooms);
    setCurrentRoom(clientApi.findMyRoom(event));
    setCurrentPosition(clientApi.findMyPlayerModel(event)?.position ?? null);
    setCurrentGame(clientApi.findMyGame(event));

    console.log(`[${new Date().toISOString()}] onReceive(${event.type})`);
  }
}

export default new MjGameService();
