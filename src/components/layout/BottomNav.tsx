
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Globe, label: "Charts", path: "/charts" },
    { icon: Users, label: "Discover", path: "/discover" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-nostr-dark border-t border-border">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-sm",
                isActive
                  ? "text-nostr-purple"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={24} className="mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
