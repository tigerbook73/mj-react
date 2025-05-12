import { create, type StateCreator } from "zustand";
import { RoomModel } from "@/common/models/room.model";
import type { PlayerModel } from "@/common/models/player.model";
import type { Game, Position } from "@/common/core/mj.game";
import type { InterfaceWithoutMethod } from "@/helper/types-helper";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export type PlayerModelInStore = InterfaceWithoutMethod<PlayerModel>;
export type RoomModelInStore = InterfaceWithoutMethod<Omit<typeof RoomModel.prototype, "game">>;
export type SeatModelInStore = InterfaceWithoutMethod<Omit<typeof PlayerModel.prototype, "game">>;
export type GameInStore = InterfaceWithoutMethod<
  Omit<typeof Game.prototype, "reversePickPosition" | "reversePickIndex" | "passedPlayers" | "queuedActions">
>;

interface MJStore {
  // app state
  appState: AppState;

  // connected state
  connected: boolean;
  setConnected: (connected: boolean) => void;

  // login user
  user: {
    email: string;
    password: string;
  };
  setUser: (user: { email: string; password: string }) => void;

  // sign state
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;

  // room info
  roomList: RoomModelInStore[];
  myRoom: RoomModelInStore | null;
  myPossition: Position | null;
  setRoomList: (roomList: RoomModelInStore[]) => void;
  setMyRoom: (room: RoomModelInStore | null) => void;
  setMyPosition: (position: Position | null) => void;

  // game info
  currentGame: GameInStore | null;
  setCurrentGame: (game: GameInStore | null) => void;

  // open
  open: boolean;
  setOpen: (open: boolean) => void;
}

const storeCreator: StateCreator<MJStore> = (set: any) => {
  const refreshAppState = (state: MJStore) => {
    const { connected, signedIn, currentGame } = state;
    if (!connected) {
      state.appState = AppState.Unconnected;
    } else if (!signedIn) {
      state.appState = AppState.UnSignedIn;
    } else if (!currentGame) {
      state.appState = AppState.InLobby;
    } else {
      state.appState = AppState.InGame;
    }
  };

  const setConnected = (connected: boolean) => {
    set((state: MJStore) => {
      state.connected = connected;
      if (!connected) {
        state.user.password = "";
        state.roomList = [];
        state.myRoom = null;
        state.myPossition = null;
        state.currentGame = null;
      }

      refreshAppState(state);
    });
  };

  const setUser = (user: { email: string; password: string }) =>
    set((state: MJStore) => {
      state.user = user;
    });

  const setSignedIn = (value: boolean) => {
    set((state: MJStore) => {
      state.signedIn = value;
      if (!value) {
        // reset other value
        state.user.password = "";
        state.roomList = [];
        state.myRoom = null;
        state.myPossition = null;
        state.currentGame = null;
      }
      refreshAppState(state);
    });
  };

  const setRoomList = (roomList: RoomModelInStore[]) => {
    set((state: MJStore) => {
      state.roomList = roomList;
    });
  };

  const setMyRoom = (room: RoomModelInStore | null) => {
    set((state: MJStore) => {
      state.myRoom = room;
    });
  };

  const setMyPosition = (position: Position | null) => {
    set((state: MJStore) => {
      state.myPossition = position;
    });
  };

  const setCurrentGame = (game: GameInStore | null) => {
    set((state: MJStore) => {
      state.currentGame = game;
      refreshAppState(state);
    });
  };

  const setOpen = (open: boolean) => {
    set((state: MJStore) => {
      state.open = open;
    });
  };

  return {
    // app state
    appState: AppState.Unconnected,

    // connected state
    connected: false,
    setConnected,

    // login user
    user: {
      email: "example@email.com",
      password: "",
    },
    setUser,

    // sign state
    signedIn: false,
    setSignedIn,

    // room info
    roomList: [],
    myRoom: null,
    myPossition: null,
    currentGame: null,
    setRoomList,
    setMyRoom,
    setMyPosition,

    // game info
    setCurrentGame,

    // open
    open: false,
    setOpen,
  };
};

const useMJStore =
  process.env.NODE_ENV === "development"
    ? create<MJStore, [["zustand/devtools", never], ["zustand/immer", never]]>(
        devtools(immer(storeCreator), { name: "MJStore" })
      )
    : create<MJStore, [["zustand/immer", never]]>(immer(storeCreator));

export default useMJStore;
