import { authService } from "@/client/auth-service";
import { socketClient } from "@/client/socket-client";
import type { GameEvent } from "@/common";
import useMJStore from "@/stores/mj-store";

class MjGameService {
  boot(): void {
    const { setConnected } = useMJStore.getState();

    socketClient.onConnect(() => {
      setConnected(true);
      console.log(`[${new Date().toISOString()}] setConnected(true)`);
    });

    socketClient.onDisconnect(() => {
      setConnected(false);
      console.log(`[${new Date().toISOString()}] setConnected(false)`);
    });

    // game event
    socketClient.onReceive((event) => this.onReceive(event));

    // try to restore session from existing cookie
    this.tryRestoreSession();
  }

  private async tryRestoreSession(): Promise<void> {
    const { setUser, setSignedIn } = useMJStore.getState();

    const restored = await authService.restoreSession();
    if (restored) {
      const user = authService.getCurrentUser();
      setUser({ email: user?.email ?? "", password: "" });
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }

  onReceive(event: GameEvent): void {
    const {
      //
      setRoomList,
      setMyRoom: setCurrentRoom,
      setMyPosition: setCurrentPosition,
      setCurrentGame,
    } = useMJStore.getState();

    event = socketClient.parseEvent(event);
    setRoomList(event.data.rooms);
    setCurrentRoom(socketClient.findMyRoom(event));
    setCurrentPosition(socketClient.findMyPlayerModel(event)?.position ?? null);
    setCurrentGame(socketClient.findMyGame(event));

    console.log(`[${new Date().toISOString()}] onReceive(${event.type})`);
  }
}

export default new MjGameService();
