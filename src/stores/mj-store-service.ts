import { clientApi } from "@/client/client-api";
import type { GameEvent } from "@/common/protocols/apis.models";
import useMJStore from "@/stores/mj-store";

class MjStoreService {
  boot() {
    const {
      //
      setConnected,
      setRoomList,
      setCurrentRoom,
      setCurrentPosition,
      setCurrentGame,
    } = useMJStore.getState();

    clientApi.gameSocket.onConnect(() => {
      setConnected(true);
    });
    clientApi.gameSocket.onDisconnect(() => {
      setConnected(false);
    });
    // game event
    const onReceive = (event: GameEvent) => {
      event = clientApi.parseEvent(event);
      setRoomList(event.data.rooms);
      setCurrentRoom(clientApi.findMyRoom(event));
      setCurrentPosition(clientApi.findMyPlayerModel(event)?.position ?? null);
      setCurrentGame(clientApi.findMyGame(event));
    };
    clientApi.gameSocket.onReceive(onReceive);
    return () => {
      clientApi.gameSocket.onConnect(); // remove onConnect
      clientApi.gameSocket.onDisconnect(); // remove onDisconnect
      clientApi.gameSocket.offReceive(onReceive); // remove onReceive
    };
  }
}

const mjStoreService = new MjStoreService();
export default mjStoreService;
