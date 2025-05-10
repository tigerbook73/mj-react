import { ClientApi } from "@/common/protocols/apis.models";
import { GameSocket } from "@/common/protocols/game-socket";

export const clientApi = new ClientApi(new GameSocket());
