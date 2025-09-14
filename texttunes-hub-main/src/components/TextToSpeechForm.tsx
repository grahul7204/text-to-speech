import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mic, Wand2 } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import { useToast } from "@/hooks/use-toast";

interface TextToSpeechFormProps {
  onGenerate: (text: string, voice: string) => void;
  isGenerating: boolean;
}

const TextToSpeechForm = ({ onGenerate, isGenerating }: TextToSpeechFormProps) => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("en-US-female");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    if (text.length > 5000) {
      toast({
        title: "Text too long",
        description: "Please limit your text to 5000 characters or less.",
        variant: "destructive",
      });
      return;
    }

    onGenerate(text, selectedVoice);
  };

  const sampleTexts = [
    "Welcome to our text-to-speech platform! Experience natural-sounding voices.",
    "The quick brown fox jumps over the lazy dog.",
    "Artificial intelligence is transforming how we interact with technology.",
  ];

  const insertSampleText = (sampleText: string) => {
    setText(sampleText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-input" className="text-sm font-medium text-muted-foreground">
            Enter your text
          </Label>
          <span className="text-xs text-muted-foreground">
            {text.length}/5000
          </span>
        </div>
        <Textarea
          id="text-input"
          placeholder="Type or paste your text here... You can enter up to 5000 characters."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="card-glass border-border/50 focus:border-primary/50 focus:ring-primary/20 min-h-32 resize-none"
          maxLength={5000}
        />
        
        {/* Sample Texts */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Quick samples:</span>
          {sampleTexts.map((sample, index) => (
            <Button
              key={index}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertSampleText(sample)}
              className="text-xs btn-glass"
            >
              Sample {index + 1}
            </Button>
          ))}
        </div>
      </div>

      {/* Voice Selection */}
      <VoiceSelector 
        selectedVoice={selectedVoice} 
        onVoiceChange={setSelectedVoice} 
      />

      {/* Generate Button */}
      <Button
        type="submit"
        disabled={isGenerating || !text.trim()}
        className="btn-hero w-full group"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
            Generating Speech...
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Convert to Speech
          </>
        )}
      </Button>

      {/* Voice Input Button */}
      <Button
        type="button"
        variant="outline"
        className="btn-glass w-full"
        onClick={() => {
          toast({
            title: "Coming Soon",
            description: "Voice input feature will be available in the next update!",
          });
        }}
      >
        <Mic className="h-4 w-4 mr-2" />
        Use Voice Input
      </Button>
    </form>
  );
};

export default TextToSpeechForm;