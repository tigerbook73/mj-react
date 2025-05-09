import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSideBar";

export default function MainLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <div className="w-full flex flex-col">
        {/* toolbar */}
        <div className="h-15 bg-accent flex items-center justify-between gap-2">
          <SidebarTrigger size="lg" className="size-10" />
          <Separator />
          <div>Mahjong Online</div>
          <div className="flex-1"></div>
          <div>example@email.com</div>
          <Separator />
          <Button variant={"ghost"}>Sign Out</Button>
          <Button variant={"ghost"}>Quit Game</Button>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
