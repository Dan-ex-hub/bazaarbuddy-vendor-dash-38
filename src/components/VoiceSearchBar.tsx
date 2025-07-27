import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { hindiToEnglishMap } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const VoiceSearchBar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const translateQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase().trim();

    // Check for direct Hindi to English mapping
    for (const [hindi, english] of Object.entries(hindiToEnglishMap)) {
      if (lowerQuery.includes(hindi) || lowerQuery.includes(english)) {
        return english;
      }
    }

    return query;
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search query empty",
        description: "Please enter something to search for.",
        variant: "destructive",
      });
      return;
    }

    const translatedQuery = translateQuery(searchQuery);

    toast({
      title: "Searching...",
      description: `Looking for "${translatedQuery}"${translatedQuery !== searchQuery ? ` (translated from "${searchQuery}")` : ''}`,
    });

    // Navigate to products page with search query
    navigate(`/products?search=${encodeURIComponent(translatedQuery)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleVoiceSearch = () => {
    if (!isListening) {
      // Start voice recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'hi-IN'; // Hindi language support
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          toast({
            title: "Voice recognition started",
            description: "Speak now... (supports Hindi and English)",
          });
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsListening(false);

          toast({
            title: "Voice captured",
            description: `You said: "${transcript}"`,
          });

          // Auto-search after capturing voice
          setTimeout(() => {
            const translatedQuery = translateQuery(transcript);
            navigate(`/products?search=${encodeURIComponent(translatedQuery)}`);
          }, 1000);
        };

        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Voice recognition failed",
            description: "Please try again or use text search.",
            variant: "destructive",
          });
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        toast({
          title: "Voice not supported",
          description: "Your browser doesn't support voice recognition.",
          variant: "destructive",
        });
      }
    } else {
      setIsListening(false);
    }
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
            <span className="text-xs sm:text-sm font-medium">{t('voice_search.listening')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearchBar;
