import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextToSpeechForm from "@/components/TextToSpeechForm";
import AudioPlayer from "@/components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Globe, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { playText } from "@/utils/speechUtils";

const Index = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (text: string, voice: string) => {
    setIsGenerating(true);
    setAudioUrl(null);

    try {
      // Use Web Speech API for immediate playback
      await playText(text, voice);
      
      // Create a mock audio URL for the player
      // In a real app, you'd call your TTS API here
      const mockAudioUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DwwmIbBD2X2+q8eSECMn7C8N2SRQ0XXLPK";
      
      setAudioUrl(mockAudioUrl);
      
      toast({
        title: "Success!",
        description: "Your text has been converted to speech.",
      });
    } catch (error) {
      console.error('TTS Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Convert text to speech in seconds with our optimized AI engine.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is processed securely and never stored on our servers.",
    },
    {
      icon: Globe,
      title: "Multiple Languages",
      description: "Support for 50+ languages and accents worldwide.",
    },
    {
      icon: Sparkles,
      title: "Natural Voices",
      description: "State-of-the-art AI voices that sound incredibly human.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
            Transform Text into
            <br />
            Natural Speech
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the power of AI-driven text-to-speech technology. Convert any text into 
            high-quality, natural-sounding audio with multiple voice options and languages.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto animate-slide-up">
          {/* Text Input Section */}
          <div className="card-elevated p-8 hover-lift">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
              Create Your Audio
            </h2>
            <TextToSpeechForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating}
            />
          </div>

          {/* Audio Player Section */}
          <div className="space-y-6">
            <div className="card-elevated p-8 hover-lift">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Your Audio
              </h2>
              <AudioPlayer audioUrl={audioUrl} isLoading={isGenerating} />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-glass p-4 text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-2xl font-bold text-accent">100+</div>
                <div className="text-sm text-muted-foreground">Voice Options</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-20 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose VoiceAI?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the advanced features that make our text-to-speech platform 
              the perfect choice for your projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-glass p-6 text-center hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-primary to-primary-light rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center animate-fade-in">
          <div className="card-glass p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators, developers, and businesses who trust VoiceAI 
              for their text-to-speech needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero">
                Start Creating Now
              </Button>
              <Button variant="outline" className="btn-glass">
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
