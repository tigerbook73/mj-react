import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <nav className="h-screen flex items-center justify-center gap-4">
      <NavLink to="/connecting" className=" w-50 h-20 bg-amber-200  p-4 rounded flex justify-center items-center">
        Connecting
      </NavLink>
      <NavLink to="/lobby" className="w-50 h-20 bg-yellow-200 p-4 rounded flex justify-center items-center">
        Lobby
      </NavLink>
      <NavLink to="/game" className="w-50 h-20 bg-red-200  p-4 rounded flex justify-center items-center">
        Game
      </NavLink>
    </nav>
  );
}
