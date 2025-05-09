import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import ConnectingPage from "./app/ConnectingPage";
import LobbyPage from "./app/LobbyPage";
import GamePage from "./app/GamePage";
import MainLayout from "./app/MainLayout";
import SignInPage from "./app/SignInPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
