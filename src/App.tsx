import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import ConnectingPage from "./app/ConnectingPage";
import LobbyPage from "./app/LobbyPage";
import GamePage from "./app/GamePage";
import MainLayout from "./app/MainLayout";
import SignInPage from "./app/SignInPage";
import NotFound from "./app/NotFound";
import { Toaster } from "./components/ui/sonner";
import TestPage from "./app/TestPage";
import MUITestPage from "./app/MUITestPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/connecting" element={<ConnectingPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/mui" element={<MUITestPage />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
export default App;
