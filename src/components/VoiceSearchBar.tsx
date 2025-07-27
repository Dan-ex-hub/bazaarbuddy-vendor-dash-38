import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VoiceSearchBar = () => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search functionality would be implemented here
  };

  return (
    <div className="relative max-w-2xl mx-auto px-2 sm:px-0">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={t('voice_search.placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-3 sm:pl-4 pr-14 sm:pr-16 py-4 sm:py-6 text-sm sm:text-lg rounded-xl sm:rounded-2xl border-2 border-border focus:border-primary shadow-soft bg-input"
        />
        <Button
          onClick={toggleVoiceSearch}
          className={`absolute right-1 sm:right-2 h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl transition-all duration-300 ${
            isListening 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-float" 
              : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
          }`}
        >
          {isListening ? (
            <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>
      
      {isListening && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 sm:px-4 py-2 bg-destructive text-destructive-foreground rounded-lg shadow-float z-10">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Listening...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearchBar;
