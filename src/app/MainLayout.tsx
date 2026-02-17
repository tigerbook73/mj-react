import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { AppSidebar } from "./AppSideBar";
import { Suspense, useEffect } from "react";
import useMJStore, { AppState } from "@/stores/mj-store";
import { socketClient } from "@/client/socket-client";
import { authService } from "@/client/auth-service";

const stateToPath = {
  [AppState.Verifying]: "/verifying",
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

  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // redirect to the correct page based on app state
  useEffect(() => {
    const path = stateToPath[appState];
    if (location.pathname.startsWith("/test") || location.pathname === path) {
      return;
    }
    navigate("/react" + path);
  }, [appState, location.pathname, navigate]);

  const handleSignOut = async () => {
    try {
      await authService.logout();
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
      await socketClient.quitGame(myRoom.name);
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
        <main className="flex flex-1 justify-center items-center">
          <Suspense fallback={<div className="flex justify-center items-center mt-2">Loading...</div>}>
            {isLoading ? (
              <div className="flex justify-center items-center mt-2 text-blue-900">
                <p>Page Loading...</p>
                <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-900"></div>
              </div>
            ) : (
              <Outlet />
            )}
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
}
