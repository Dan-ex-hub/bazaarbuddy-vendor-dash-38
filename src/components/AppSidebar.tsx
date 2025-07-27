import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  ShoppingBag, 
  CreditCard, 
  Tag, 
  Palette, 
  Globe, 
  LogOut,
  Package
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const sidebarItems = [
  { title: "BazaarBuddy", url: "/", icon: Package, isHeader: true },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Recent Orders", url: "/orders", icon: ShoppingBag },
  { title: "Payment Info", url: "/payment", icon: CreditCard },
  { title: "Offers & Deals", url: "/offers", icon: Tag },
  { title: "Switch Theme", url: "/theme", icon: Palette },
  { title: "Language", url: "/language", icon: Globe },
  { title: "Logout", url: "/logout", icon: LogOut, isAction: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.isHeader ? (
                    <div className="flex items-center space-x-3 px-3 py-4 mb-4">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      {!isCollapsed && (
                        <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      )}
                    </div>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => `flex items-center space-x-3 px-3 py-3 transition-all duration-200 ${getNavCls({ isActive })} ${item.isAction ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}