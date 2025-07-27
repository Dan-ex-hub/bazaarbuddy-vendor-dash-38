import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
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

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuth();
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

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageSwitch = () => {
    const languages = ['en', 'hi', 'mr'] as const;
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const handleLinkClick = (e: React.MouseEvent, url: string, isAction?: boolean) => {
    // Handle special actions
    if (isAction) {
      e.preventDefault();
      if (url === "/theme") {
        handleThemeSwitch();
        return;
      }
      if (url === "/language") {
        handleLanguageSwitch();
        return;
      }
      if (url === "/logout") {
        // Handle logout logic here
        console.log("Logout clicked");
        return;
      }
    }

    // Check for modifier keys for normal navigation
    if (e.ctrlKey || e.metaKey) {
      // Ctrl+click or Cmd+click - open in new tab
      e.preventDefault();
      window.open(url, '_blank');
    } else if (e.shiftKey) {
      // Shift+click - open in new window
      e.preventDefault();
      window.open(url, '_blank');
    } else if (!isAction) {
      // Otherwise, let React Router handle normal navigation
      e.preventDefault();
      navigate(url);
    }
  };

  const sidebarItems = [
    { title: t('app.name'), url: "/", icon: Package, isHeader: true },
    { title: t('nav.profile'), url: "/profile", icon: User },
    { title: t('nav.recent_orders'), url: "/orders", icon: ShoppingBag },
    { title: t('nav.payment_info'), url: "/payment", icon: CreditCard },
    { title: t('nav.offers_deals'), url: "/offers", icon: Tag },
    { title: t('nav.switch_theme'), url: "/theme", icon: Palette, isAction: true },
    { title: t('nav.language'), url: "/language", icon: Globe, isAction: true },
    { title: t('nav.logout'), url: "/logout", icon: LogOut, isAction: true },
  ];

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
                    <div className="flex items-center justify-center px-3 py-3 sm:py-4 mb-3 sm:mb-4">
                      <div className={`p-2 bg-gradient-primary rounded-lg ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
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
                      <a
                        href={item.isAction ? "#" : item.url}
                        onClick={(e) => handleLinkClick(e, item.url, item.isAction)}
                        onAuxClick={(e) => {
                          // Handle middle-click
                          if (e.button === 1 && !item.isAction) {
                            e.preventDefault();
                            window.open(item.url, '_blank');
                          }
                        }}
                        className={`flex items-center space-x-3 px-3 py-2 sm:py-3 transition-all duration-200 ${
                          !item.isAction && isActive(item.url)
                            ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                            : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        } ${item.url === "/logout" ? 'text-destructive hover:text-destructive hover:bg-destructive/10' : ''}`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="text-xs sm:text-sm font-medium">
                            {item.title}
                            {item.url === "/language" && (
                              <span className="ml-1 text-xs opacity-70">
                                ({language.toUpperCase()})
                              </span>
                            )}
                          </span>
                        )}
                      </a>
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
