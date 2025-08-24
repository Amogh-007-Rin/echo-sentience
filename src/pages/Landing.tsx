import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight, 
  Play, 
  CheckCircle, 
  Globe, 
  Sparkles,
  MoveRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Companion",
      description: "Sophisticated emotional intelligence that understands and responds to your feelings with empathy and precision."
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Engage in meaningful dialogue with voice and text support, powered by cutting-edge natural language processing."
    },
    {
      icon: BarChart3,
      title: "Emotion Analytics",
      description: "Comprehensive insights into your emotional patterns and trends to support your mental wellness journey."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations remain private with end-to-end encryption and local data processing."
    },
    {
      icon: Zap,
      title: "Real-time Response",
      description: "Instant emotional analysis and feedback for immediate support when you need it most."
    },
    {
      icon: Globe,
      title: "3D Visualization",
      description: "Beautiful, interactive AI avatar that responds to emotions with stunning visual feedback."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Echo Sentience has transformed how I understand my emotional patterns. The insights are incredibly valuable."
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Therapist",
      content: "I recommend this tool to my clients. The emotional tracking capabilities are scientifically sound and helpful."
    },
    {
      name: "Emma Thompson",
      role: "Student",
      content: "The AI companion feels genuinely supportive. It's like having a therapist available 24/7."
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-auto">
      {/* Navigation */}
      <motion.nav
        className="glass border-b border-glass-border p-4 sticky top-0 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent-blue rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-mono glow-text-primary font-semibold">Echo Sentience</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </div>

          <Link to="/app">
            <Button className="glow-primary">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent-blue/10" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 glow-text-primary">
              Your AI Emotional
              <span className="block text-accent-blue">Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of emotional wellness with our advanced AI that understands, 
              analyzes, and responds to your feelings with professional-grade insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link to="/app">
              <Button size="lg" className="glow-primary text-lg px-8 py-4">
                Start Free Trial
                <MoveRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="glass rounded-2xl p-8 glow-primary">
              <div className="aspect-video bg-gradient-to-br from-background-secondary to-card rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent-blue rounded-full mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Interactive AI Globe Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 glow-text-primary">
              Professional Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology designed for emotional wellness and personal growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="glass h-full transition-all duration-300 group-hover:glow-primary">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent-blue rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-background" />
                    </div>
                    <CardTitle className="text-xl font-mono glow-text-primary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-background-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 glow-text-primary">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what experts and users say about Echo Sentience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass h-full">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent-blue rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 glow-text-primary">
              Ready to Transform Your
              <span className="block text-accent-blue">Emotional Wellness?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered the power of AI-driven emotional intelligence
            </p>
            <Link to="/app">
              <Button size="lg" className="glow-primary text-lg px-12 py-4">
                Start Your Journey
                <MoveRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-glass-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent-blue rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-background" />
                </div>
                <span className="text-xl font-mono glow-text-primary font-semibold">Echo Sentience</span>
              </div>
              <p className="text-muted-foreground">
                Professional AI emotional companion for modern wellness
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-glass-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Echo Sentience. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}