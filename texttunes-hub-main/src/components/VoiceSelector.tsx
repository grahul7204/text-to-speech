import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Voice {
  id: string;
  name: string;
  language: string;
  gender: string;
}

const voices: Voice[] = [
  { id: "en-US-female", name: "Sarah", language: "English (US)", gender: "Female" },
  { id: "en-US-male", name: "David", language: "English (US)", gender: "Male" },
  { id: "en-GB-female", name: "Emma", language: "English (UK)", gender: "Female" },
  { id: "en-GB-male", name: "Oliver", language: "English (UK)", gender: "Male" },
  { id: "es-ES-female", name: "Sofia", language: "Spanish", gender: "Female" },
  { id: "fr-FR-female", name: "Camille", language: "French", gender: "Female" },
  { id: "de-DE-male", name: "Hans", language: "German", gender: "Male" },
  { id: "it-IT-female", name: "Giulia", language: "Italian", gender: "Female" },
];

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
}

const VoiceSelector = ({ selectedVoice, onVoiceChange }: VoiceSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="voice-select" className="text-sm font-medium text-muted-foreground">
        Select Voice
      </Label>
      <Select value={selectedVoice} onValueChange={onVoiceChange}>
        <SelectTrigger id="voice-select" className="card-glass border-border/50 focus:border-primary/50 focus:ring-primary/20">
          <SelectValue placeholder="Choose a voice..." />
        </SelectTrigger>
        <SelectContent className="card-glass border-border/50">
          {voices.map((voice) => (
            <SelectItem 
              key={voice.id} 
              value={voice.id}
              className="hover:bg-muted/50 focus:bg-muted/50"
            >
              <div className="flex flex-col">
                <span className="font-medium">{voice.name}</span>
                <span className="text-sm text-muted-foreground">
                  {voice.language} • {voice.gender}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceSelector;