import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const handleSidebarClick = (e: React.MouseEvent) => {
    // Only toggle if clicking on the sidebar background, not on menu items
    if (e.target === e.currentTarget) {
      toggleSidebar();
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    // Check for modifier keys
    if (e.ctrlKey || e.metaKey) {
      // Ctrl+click or Cmd+click - open in new tab
      e.preventDefault();
      window.open(url, '_blank');
    } else if (e.shiftKey) {
      // Shift+click - open in new window
      e.preventDefault();
      window.open(url, '_blank');
    }
    // Otherwise, let React Router handle normal navigation
  };

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-border cursor-pointer" onClick={handleSidebarClick}>
        <SidebarGroup>
          <SidebarGroupContent onClick={(e) => e.stopPropagation()}>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.isHeader ? (
                    <div className="flex items-center space-x-3 px-3 py-3 sm:py-4 mb-3 sm:mb-4">
                      <div className="p-2 bg-gradient-primary rounded-lg">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      {!isCollapsed && (
                        <span className="text-base sm:text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                          {item.title}
                        </span>
                      )}
                    </div>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onMouseDown={(e) => {
                          // Allow middle-click to open in new tab
                          if (e.button === 1) {
                            e.preventDefault();
                            window.open(item.url, '_blank');
                          }
                        }}
                        onAuxClick={(e) => {
                          // Handle middle-click
                          if (e.button === 1) {
                            e.preventDefault();
                            window.open(item.url, '_blank');
                          }
                        }}
                        className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 sm:py-3 transition-all duration-200 ${getNavCls({ isActive })} ${item.isAction ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="text-xs sm:text-sm font-medium">{item.title}</span>}
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
