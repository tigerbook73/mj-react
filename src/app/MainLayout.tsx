import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSideBar";
import { useEffect } from "react";
import useMJStore, { AppState } from "@/stores/mj-store";
import { clientApi } from "@/client/client-api";

const stateToPath = {
  [AppState.Unconnected]: "/connecting",
  [AppState.UnSignedIn]: "/sign-in",
  [AppState.InLobby]: "/lobby",
  [AppState.InGame]: "/game",
};

export default function MainLayout() {
  const appState = useMJStore((state) => state.appState);
  const user = useMJStore((state) => state.user);
  const myRoom = useMJStore((state) => state.myRoom);
  const setSignedIn = useMJStore((state) => state.setSignedIn);

  // redirect to the correct page based on app state
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const path = stateToPath[appState];
    if (location.pathname === "/test" || location.pathname === path) {
      return;
    }
    navigate(path);
  }, [appState, location.pathname, navigate]);

  const handleSignOut = async () => {
    try {
      await clientApi.signOut();
      setSignedIn(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuitGame = async () => {
    if (!myRoom) {
      return;
    }

    try {
      await clientApi.quitGame(myRoom.name);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />

      <div className="w-full flex flex-col">
        {/* toolbar */}
        <div className="h-15 bg-accent flex items-center justify-between gap-2">
          <SidebarTrigger size="lg" className="size-10" />
          <Separator />
          <div>Mahjong Online</div>
          <div className="flex-1"></div>
          <div>{user.email}</div>
          <Separator />
          {appState === AppState.InGame && (
            <Button variant={"ghost"} onClick={handleQuitGame}>
              Quit Game
            </Button>
          )}
          {appState === AppState.InLobby && (
            <Button variant={"ghost"} onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </div>
        <div className="flex flex-1 justify-center items-center">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
