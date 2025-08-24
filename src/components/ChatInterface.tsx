import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

interface ChatInterfaceProps {
  onEmotionDetected: (emotion: string) => void;
  onListeningChange: (isListening: boolean) => void;
  onSpeakingChange: (isSpeaking: boolean) => void;
}

export default function ChatInterface({ 
  onEmotionDetected, 
  onListeningChange, 
  onSpeakingChange 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your emotional AI companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simple emotion detection (placeholder for now)
  const detectEmotion = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('great')) {
      return 'happy';
    } else if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('upset')) {
      return 'sad';
    } else if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('stress')) {
      return 'anxious';
    } else if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed')) {
      return 'calm';
    } else {
      return 'neutral';
    }
  };

  // Generate AI response
  const generateAIResponse = (userMessage: string, detectedEmotion: string): string => {
    const responses = {
      happy: [
        "That's wonderful to hear! Your positive energy is truly uplifting. What's bringing you this joy?",
        "I'm so glad you're feeling happy! It's beautiful to experience those moments of joy.",
        "Your happiness is contagious! Tell me more about what's making you feel so good."
      ],
      sad: [
        "I can sense you're going through a difficult time. It's okay to feel sad - your emotions are valid.",
        "I'm here with you during this tough moment. Would you like to talk about what's weighing on your heart?",
        "Sometimes sadness can feel overwhelming. Remember that you're not alone in this feeling."
      ],
      anxious: [
        "I understand that anxiety can feel very overwhelming. Let's take this one breath at a time.",
        "It sounds like you're carrying some worry right now. Would it help to talk through what's on your mind?",
        "Anxiety can be really challenging. Remember that you're stronger than you know, and this feeling will pass."
      ],
      calm: [
        "It's beautiful that you're feeling peaceful right now. These moments of calm are precious.",
        "I love hearing that you're in a serene state of mind. What's helping you feel so centered?",
        "Your sense of calm is wonderful. It's important to savor these tranquil moments."
      ],
      neutral: [
        "Thank you for sharing with me. How can I support you today?",
        "I'm listening and here for you. What would you like to explore together?",
        "I appreciate you opening up. What's on your mind right now?"
      ]
    };

    const responseArray = responses[detectedEmotion as keyof typeof responses] || responses.neutral;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Detect emotion
    const emotion = detectEmotion(inputMessage);
    onEmotionDetected(emotion);

    // Save emotion to localStorage (temporary solution)
    const emotions = JSON.parse(localStorage.getItem('emotionHistory') || '[]');
    emotions.push({
      emotion,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('emotionHistory', JSON.stringify(emotions));

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage, emotion),
        sender: 'ai',
        timestamp: new Date(),
        emotion,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Simulate text-to-speech
      speakMessage(aiResponse.content);
    }, 1500);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      onSpeakingChange(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        onSpeakingChange(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Available",
        description: "Your browser doesn't support voice recognition.",
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
      onListeningChange(false);
    } else {
      setIsListening(true);
      onListeningChange(true);
      
      // Placeholder for voice recognition
      toast({
        title: "Voice Recognition",
        description: "Voice input feature will be fully implemented with proper backend integration.",
      });
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        onListeningChange(false);
      }, 3000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <motion.div
        className="glass p-4 border-b border-glass-border"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-orbitron glow-text-cyan">Echo Sentience</h2>
        <p className="text-sm text-muted-foreground">Your Emotional AI Companion</p>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg glass ${
                  message.sender === 'user'
                    ? 'bg-primary/20 border-primary/30'
                    : 'bg-card/40 border-accent/30'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.emotion && (
                    <span className="bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded-full">
                      {message.emotion}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="glass p-3 rounded-lg bg-card/40 border-accent/30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="text-sm text-muted-foreground ml-2">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        className="glass p-4 border-t border-glass-border"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={`glass transition-all duration-300 ${
              isListening ? 'glow-purple animate-pulse' : 'hover:glow-blue'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <div className="flex-1">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Share your thoughts and feelings..."
              className="glass bg-input/50 border-input-border focus:border-primary focus:glow-blue"
              disabled={isLoading}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="glass bg-primary/20 hover:bg-primary/30 hover:glow-blue transition-all duration-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}