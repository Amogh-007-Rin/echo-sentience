import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Heart, TrendingUp, Calendar } from 'lucide-react';

interface EmotionEntry {
  emotion: string;
  timestamp: string;
}

interface EmotionStats {
  emotion: string;
  count: number;
  percentage: number;
  color: string;
}

interface TimelineData {
  time: string;
  happy: number;
  sad: number;
  anxious: number;
  calm: number;
  neutral: number;
}

export default function EmotionDashboard() {
  const [emotionHistory, setEmotionHistory] = useState<EmotionEntry[]>([]);
  const [stats, setStats] = useState<EmotionStats[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);

  useEffect(() => {
    loadEmotionData();
    const interval = setInterval(loadEmotionData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadEmotionData = () => {
    const data = JSON.parse(localStorage.getItem('emotionHistory') || '[]') as EmotionEntry[];
    setEmotionHistory(data);
    calculateStats(data);
    generateTimelineData(data);
  };

  const calculateStats = (data: EmotionEntry[]) => {
    const emotionCounts: Record<string, number> = {};
    const total = data.length;

    data.forEach(entry => {
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1;
    });

    const emotionColors: Record<string, string> = {
      happy: '#00ffff',
      sad: '#6366ff',
      anxious: '#ff6b6b',
      calm: '#9d4edd',
      neutral: '#00d4ff'
    };

    const statsArray = Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: emotionColors[emotion] || '#00d4ff'
    }));

    setStats(statsArray.sort((a, b) => b.count - a.count));
  };

  const generateTimelineData = (data: EmotionEntry[]) => {
    // Group emotions by hour
    const hourlyData: Record<string, { happy: number; sad: number; anxious: number; calm: number; neutral: number }> = {};
    
    data.forEach(entry => {
      const hour = new Date(entry.timestamp).getHours();
      const hourKey = `${hour}:00`;
      
      if (!hourlyData[hourKey]) {
        hourlyData[hourKey] = { happy: 0, sad: 0, anxious: 0, calm: 0, neutral: 0 };
      }
      
      if (entry.emotion in hourlyData[hourKey]) {
        hourlyData[hourKey][entry.emotion as keyof typeof hourlyData[typeof hourKey]] += 1;
      }
    });

    const timeline: TimelineData[] = Object.entries(hourlyData)
      .map(([time, emotions]) => ({
        time,
        happy: emotions.happy,
        sad: emotions.sad,
        anxious: emotions.anxious,
        calm: emotions.calm,
        neutral: emotions.neutral
      }))
      .sort((a, b) => parseInt(a.time) - parseInt(b.time));

    setTimelineData(timeline);
  };

  const getInsight = () => {
    if (stats.length === 0) return "Start chatting to see your emotional insights!";
    
    const dominant = stats[0];
    const recent = emotionHistory.slice(-5);
    const recentEmotions = recent.map(e => e.emotion);
    
    if (dominant.emotion === 'happy') {
      return `You've been predominantly happy (${dominant.percentage}%)! Your positive outlook is wonderful.`;
    } else if (dominant.emotion === 'calm') {
      return `You maintain a calm demeanor (${dominant.percentage}% of the time). Your inner peace is admirable.`;
    } else if (dominant.emotion === 'anxious') {
      return `I notice you've been feeling anxious lately (${dominant.percentage}%). Remember, it's okay to feel this way.`;
    } else {
      return `Your emotional patterns show ${dominant.emotion} as the most frequent feeling (${dominant.percentage}%).`;
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-orbitron glow-text-cyan mb-2">Emotion Dashboard</h1>
        <p className="text-muted-foreground">Track your emotional journey over time</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              <Brain className="h-4 w-4 text-neon-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold glow-text-cyan">{emotionHistory.length}</div>
              <p className="text-xs text-muted-foreground">
                conversations analyzed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dominant Emotion</CardTitle>
              <Heart className="h-4 w-4 text-neon-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold glow-text-purple">
                {stats[0]?.emotion || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats[0]?.percentage || 0}% of the time
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold glow-text-blue">
                {emotionHistory.filter(e => 
                  new Date(e.timestamp).toDateString() === new Date().toDateString()
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                interactions today
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emotional Range</CardTitle>
              <TrendingUp className="h-4 w-4 text-neon-pink" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold glow-text-pink">
                {stats.length}
              </div>
              <p className="text-xs text-muted-foreground">
                different emotions detected
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="glow-text-cyan">AI Insight</CardTitle>
            <CardDescription>What your emotional patterns reveal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{getInsight()}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="glass grid w-full grid-cols-3">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="frequency">Frequency</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="space-y-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Emotion Distribution</CardTitle>
                <CardDescription>How your emotions are distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ emotion, percentage }) => `${emotion}: ${percentage}%`}
                      >
                        {stats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Emotional Timeline</CardTitle>
                <CardDescription>Your emotions throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="time" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Line type="monotone" dataKey="happy" stroke="#00ffff" strokeWidth={2} />
                      <Line type="monotone" dataKey="sad" stroke="#6366ff" strokeWidth={2} />
                      <Line type="monotone" dataKey="anxious" stroke="#ff6b6b" strokeWidth={2} />
                      <Line type="monotone" dataKey="calm" stroke="#9d4edd" strokeWidth={2} />
                      <Line type="monotone" dataKey="neutral" stroke="#00d4ff" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="frequency" className="space-y-4">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Emotion Frequency</CardTitle>
                <CardDescription>How often you experience each emotion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="emotion" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Bar dataKey="count" fill="#00d4ff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}