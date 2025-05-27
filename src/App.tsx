import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/MainLayout";
import { Toaster } from "./components/ui/sonner";
import React, { Suspense } from "react";

const ConnectingPage = React.lazy(() => import("./app/ConnectingPage"));
const LobbyPage = React.lazy(() => import("./app/LobbyPage"));
const GamePage = React.lazy(() => import("./app/GamePage"));
const SignInPage = React.lazy(() => import("./app/SignInPage"));
const NotFound = React.lazy(() => import("./app/NotFound"));
const TestPage = React.lazy(() => import("./app/TestPage"));
const MUITestPage = React.lazy(() => import("./app/MUITestPage"));
const Home = React.lazy(() => import("./app/Home"));

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
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
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
export default App;
