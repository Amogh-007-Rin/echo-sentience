import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, BarChart3, Sparkles } from 'lucide-react';
import AIGlobe from '@/components/AIGlobe';
import ChatInterface from '@/components/ChatInterface';
import EmotionDashboard from '@/components/EmotionDashboard';

export default function Index() {
  const [currentEmotion, setCurrentEmotion] = useState<'neutral' | 'happy' | 'sad' | 'anxious' | 'calm'>('neutral');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  const handleEmotionDetected = (emotion: string) => {
    setCurrentEmotion(emotion as typeof currentEmotion);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background opacity-90" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="glass border-b border-glass-border p-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-mono glow-text-primary font-semibold">Echo Sentience</h1>
                <p className="text-xs text-muted-foreground">Professional AI Assistant</p>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="glass">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.header>

        {/* Main Layout */}
        <div className="flex-1 flex">
          {/* Left Side - AI Globe */}
          <motion.div
            className="w-1/3 border-r border-glass-border glass relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-full flex flex-col">
              {/* Globe Container */}
              <div className="flex-1 relative">
                <AIGlobe
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  emotionalState={currentEmotion}
                />
                
                {/* Floating Emotion Indicator */}
                <motion.div
                  className="absolute top-4 right-4 glass rounded-full px-3 py-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  key={currentEmotion}
                >
                  <span className="text-sm font-mono glow-text-primary capitalize">
                    {currentEmotion}
                  </span>
                </motion.div>
              </div>

              {/* AI Status */}
              <div className="p-4 border-t border-glass-border">
                <div className="text-center space-y-2">
                  <div className="text-sm font-mono glow-text-primary">
                    System Status
                  </div>
                  <div className="flex justify-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-subtle-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isSpeaking ? 'Responding...' : isListening ? 'Processing...' : 'Ready to help'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Chat/Dashboard */}
          <motion.div
            className="flex-1 glass"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs value={activeTab} className="h-full">
              <TabsContent value="chat" className="h-full m-0">
                <ChatInterface
                  onEmotionDetected={handleEmotionDetected}
                  onListeningChange={setIsListening}
                  onSpeakingChange={setIsSpeaking}
                />
              </TabsContent>
              
              <TabsContent value="dashboard" className="h-full m-0">
                <EmotionDashboard />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="glass border-t border-glass-border p-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="container mx-auto text-center">
            <p className="text-xs text-muted-foreground">
              Your conversations are private and secure. Emotions are stored locally for analysis.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}