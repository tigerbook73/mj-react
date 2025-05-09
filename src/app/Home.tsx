import { Dice5, Hospital, LogIn, MonitorUp } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <nav className="h-full flex items-center justify-center gap-4">
      <NavLink to="/connecting" className=" w-50 h-20 bg-amber-200  p-4 rounded flex justify-center items-center">
        <MonitorUp />
        <div className="ml-2">Connecting</div>
      </NavLink>
      <NavLink to="/sign-in" className=" w-50 h-20 bg-amber-200  p-4 rounded flex justify-center items-center">
        <LogIn />
        <div className="ml-2">Sign In</div>
      </NavLink>
      <NavLink to="/lobby" className="w-50 h-20 bg-yellow-200 p-4 rounded flex justify-center items-center">
        <Hospital />
        <div className="ml-2">Lobby</div>
      </NavLink>
      <NavLink to="/game" className="w-50 h-20 bg-red-200  p-4 rounded flex justify-center items-center">
        <Dice5 />
        <div className="ml-2">Game</div>
      </NavLink>
    </nav>
  );
}
