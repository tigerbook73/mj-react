import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Dice5, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <div className="h-15 bg-accent flex items-center gap-2">
        <Button variant="outline" size="lg" className="mx-2" onClick={() => alert("hello")}>
          <Menu size={24} />
        </Button>
        <Dice5 />
        <div>Mahjong Online</div>
        <div className="flex-1"></div>
        <div>example@email.com</div>
        <Separator />
        <Button>Sign Out</Button>
        <Button>Quit Game</Button>
      </div>

      <Outlet />
    </div>
  );
}
