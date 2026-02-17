import { GameSocket, SocketClient } from "@/common";

export const socketClient = new SocketClient(new GameSocket());
