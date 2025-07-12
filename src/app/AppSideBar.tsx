import { Dice5, Home, LogIn, MonitorUp, School, TestTube2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/react/",
    icon: Home,
  },
  {
    title: "Connecting",
    url: "/react/connecting",
    icon: MonitorUp,
  },
  {
    title: "Sign In",
    url: "/react/sign-in",
    icon: LogIn,
  },
  {
    title: "Lobby",
    url: "/react/lobby",
    icon: School,
  },
  {
    title: "Game",
    url: "/react/game",
    icon: Dice5,
  },
  {
    title: "Test",
    url: "/react/test",
    icon: TestTube2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-md">Mahjong Online</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
