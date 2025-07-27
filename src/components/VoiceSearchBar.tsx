import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff } from "lucide-react";

const VoiceSearchBar = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search functionality would be implemented here
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search Ingredients by Voice…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-4 pr-16 py-6 text-lg rounded-2xl border-2 border-border focus:border-primary shadow-soft bg-input"
        />
        <Button
          onClick={toggleVoiceSearch}
          className={`absolute right-2 h-12 w-12 rounded-xl transition-all duration-300 ${
            isListening 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-float" 
              : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
          }`}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg shadow-float">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearchBar;