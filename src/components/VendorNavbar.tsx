import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, User, Heart, Gift } from "lucide-react";

const VendorNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" }
  ];

  return (
    <nav className="bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Name */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer">
                BazaarBuddy
              </h1>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/donate">
              <Button variant="ghost" className="flex items-center space-x-2 text-green-600 hover:text-green-700 hover:bg-green-50">
                <Heart className="h-4 w-4" />
                <span>Donate Food</span>
              </Button>
            </Link>
            <Link to="/food-donations">
              <Button variant="ghost" className="flex items-center space-x-2 text-green-600 hover:text-green-700 hover:bg-green-50">
                <Gift className="h-4 w-4" />
                <span>My Donations</span>
              </Button>
            </Link>
          </div>

          {/* Right side - Language selector and Profile */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>{selectedLanguage}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border border-border shadow-float">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className="hover:bg-muted cursor-pointer"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Avatar */}
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Vendor" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VendorNavbar;