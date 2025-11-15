import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package2, Home, History, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Nova Entrega", href: "/new", icon: PlusCircle },
    { name: "Histórico", href: "/history", icon: History },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6 text-primary" />
            <span className="text-xl">DeliveryTrack</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          <Button variant="ghost" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "w-full flex-col h-auto py-2 gap-1",
                  !isActive(item.href) && "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs">{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
