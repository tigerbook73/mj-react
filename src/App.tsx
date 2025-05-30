import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import MainLayout from "./app/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/react" replace />,
  },
  {
    path: "/react",
    Component: MainLayout,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./app/Home")).default }) },
      { path: "connecting", lazy: async () => ({ Component: (await import("./app/ConnectingPage")).default }) },
      { path: "sign-in", lazy: async () => ({ Component: (await import("./app/SignInPage")).default }) },
      { path: "lobby", lazy: async () => ({ Component: (await import("./app/LobbyPage")).default }) },
      { path: "game", lazy: async () => ({ Component: (await import("./app/GamePage")).default }) },
      { path: "test", lazy: async () => ({ Component: (await import("./app/TestPage")).default }) },
      { path: "test/mui", lazy: async () => ({ Component: (await import("./app/MUITestPage")).default }) },
      { path: "*", lazy: async () => ({ Component: (await import("./app/NotFound")).default }) },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
