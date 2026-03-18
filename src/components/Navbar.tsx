import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, ShoppingCart, Store, Upload, LayoutDashboard, FlaskConical } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <span
          className="font-heading text-xl font-bold text-foreground cursor-pointer tracking-tight"
          onClick={() => navigate("/")}
        >
          biostack
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant={isActive("/dashboard") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <Button
            variant={isActive("/blood-test") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/blood-test")}
          >
            <Upload className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Blood Test</span>
          </Button>
          <Button
            variant={isActive("/marketplace") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/marketplace")}
          >
            <Store className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Shop</span>
          </Button>
          <Button
            variant={isActive("/quiz") ? "secondary" : "ghost"}
            size="sm"
            onClick={() => navigate("/quiz")}
          >
            <FlaskConical className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Quiz</span>
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
