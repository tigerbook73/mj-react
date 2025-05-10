import { create } from "zustand";
import { RoomModel } from "@/common/models/room.model";
import type { PlayerModel } from "@/common/models/player.model";
import type { Game, Position } from "@/common/core/mj.game";
import type { InterfaceWithoutMethod } from "@/helper/types-helper";
import { immer } from "zustand/middleware/immer";

export enum AppState {
  Unconnected = "UNCONNECTED",
  UnSignedIn = "UNSIGNED_IN",
  InLobby = "IN_LOBBY",
  InGame = "IN_GAME",
}

export type PlayerModelInStore = InterfaceWithoutMethod<PlayerModel>;
export type RoomModelInStore = InterfaceWithoutMethod<Omit<typeof RoomModel.prototype, "game">>;
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

  // sign state
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;

  // room info
  roomList: RoomModelInStore[];
  currentRoom: RoomModelInStore | null;
  currentPosition: Position | null;

  // game info
  currentGame: GameInStore | null;

  // open
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useMJStore = create<MJStore, [["zustand/immer", never]]>(
  immer((set) => {
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
      set((state) => {
        state.connected = connected;
        refreshAppState(state);
      });
    };

    const setSignedIn = (value: boolean) => {
      set((state) => {
        state.signedIn = value;
        if (!value) {
          // reset other value
          state.user.password = "";
          state.roomList = [];
          state.currentRoom = null;
          state.currentPosition = null;
          state.currentGame = null;
        }
        refreshAppState(state);
      });
    };

    const setCurrentGame = (game: GameInStore) => {
      set((state) => {
        state.currentGame = game;
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
      setUser: (user: { email: string; password: string }) => set((state) => (state.user = user)),

      // sign state
      signedIn: false,
      setSignedIn: setSignedIn,

      // room info
      roomList: [],
      currentRoom: null,
      currentPosition: null,
      currentGame: null,
      setRoomList: (roomList: RoomModelInStore[]) => set((state) => (state.roomList = roomList)),
      setCurrentRoom: (room: RoomModelInStore) => set((state) => (state.currentRoom = room)),
      setCurrentPosition: (position: Position) => set((state) => (state.currentPosition = position)),

      setCurrentGame,

      // open
      open: false,
      setOpen: (open: boolean) => set((state) => (state.open = open)),
    };
  })
);

export default useMJStore;
