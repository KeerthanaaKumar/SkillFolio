import { useState } from "react";
import { Send, Bot, User, Lightbulb, BookOpen, Award, Calendar, ExternalLink, Sparkles } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  recommendations?: Recommendation[];
}

interface Recommendation {
  title: string;
  type: 'course' | 'certification' | 'event' | 'skill';
  provider: string;
  description: string;
  difficulty: string;
  duration: string;
  link?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'bot',
    content: "Hello! I'm your Skill Mentor AI. I can help you identify skill gaps and recommend learning paths based on your goals. What would you like to achieve?",
    timestamp: new Date(),
    suggestions: [
      "I want to learn DevOps",
      "How can I improve my leadership skills?",
      "What certifications should I pursue?",
      "Help me prepare for data science roles"
    ]
  }
];

const sampleRecommendations: Recommendation[] = [
  {
    title: "Docker & Kubernetes Fundamentals",
    type: 'course',
    provider: "Coursera",
    description: "Learn containerization and orchestration with hands-on projects",
    difficulty: "Intermediate",
    duration: "6 weeks",
    link: "https://coursera.org/docker-kubernetes"
  },
  {
    title: "AWS DevOps Engineer Professional",
    type: 'certification',
    provider: "Amazon Web Services",
    description: "Professional-level certification for DevOps practitioners",
    difficulty: "Advanced",
    duration: "3-6 months prep",
    link: "https://aws.amazon.com/certification"
  },
  {
    title: "DevOps Days Conference 2024",
    type: 'event',
    provider: "DevOps Community",
    description: "Annual conference on DevOps practices and tools",
    difficulty: "All levels",
    duration: "2 days",
    link: "https://devopsdays.org"
  }
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('devops')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "Great! DevOps is an excellent career path. Based on your current profile, I notice you have strong programming skills but are missing some key DevOps competencies. Here are my personalized recommendations:",
        timestamp: new Date(),
        recommendations: sampleRecommendations,
        suggestions: [
          "What about cloud platforms?",
          "How long will this take?",
          "Show me beginner-friendly options",
          "What are the salary prospects?"
        ]
      };
    } else if (lowerMessage.includes('leadership')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "Leadership skills are crucial for career advancement! I see you've participated in some community service, which is great. Here are ways to further develop your leadership abilities:",
        timestamp: new Date(),
        recommendations: [
          {
            title: "Leadership in Tech Workshop",
            type: 'course',
            provider: "University Extension",
            description: "Develop leadership skills specific to technology teams",
            difficulty: "Intermediate",
            duration: "4 weeks"
          },
          {
            title: "Project Management Professional (PMP)",
            type: 'certification',
            provider: "PMI",
            description: "Industry-standard project management certification",
            difficulty: "Advanced",
            duration: "3-4 months prep"
          }
        ],
        suggestions: [
          "What about team management?",
          "How can I lead without authority?",
          "Show me volunteer leadership opportunities"
        ]
      };
    } else if (lowerMessage.includes('certification')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "Certifications are a great way to validate your skills! Based on your computer science background and current achievements, here are the most valuable certifications for your profile:",
        timestamp: new Date(),
        recommendations: [
          {
            title: "AWS Solutions Architect",
            type: 'certification',
            provider: "Amazon Web Services",
            description: "Most in-demand cloud architecture certification",
            difficulty: "Intermediate",
            duration: "2-3 months prep"
          },
          {
            title: "Google Cloud Professional",
            type: 'certification',
            provider: "Google Cloud",
            description: "Professional-level cloud platform certification",
            difficulty: "Advanced",
            duration: "3-4 months prep"
          }
        ],
        suggestions: [
          "Which has better job prospects?",
          "What's the cost involved?",
          "How do I prepare effectively?"
        ]
      };
    } else {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "I understand you're looking to grow your skills! To give you the most relevant recommendations, could you tell me more about your specific goals or the field you're interested in?",
        timestamp: new Date(),
        suggestions: [
          "I want to get into AI/ML",
          "Help me with web development",
          "I'm interested in cybersecurity",
          "Show me data science paths"
        ]
      };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'certification': return <Award className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'certification': return 'bg-green-100 text-green-800 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Skill Mentor AI
          </h2>
          <p className="text-muted-foreground">Get personalized learning recommendations based on your goals</p>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in Full Screen
        </Button>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Skill Mentor</CardTitle>
              <CardDescription>AI-powered career guidance</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'bot' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    {/* Recommendations */}
                    {message.recommendations && (
                      <div className="mt-3 space-y-3">
                        {message.recommendations.map((rec, index) => (
                          <Card key={index} className="border-l-4 border-l-primary">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 flex-1">
                                  <div className={`p-2 rounded-lg ${getRecommendationColor(rec.type)}`}>
                                    {getRecommendationIcon(rec.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{rec.title}</h4>
                                      <Badge className={getRecommendationColor(rec.type)}>
                                        {rec.type}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>Provider: {rec.provider}</span>
                                      <span>•</span>
                                      <span>Level: {rec.difficulty}</span>
                                      <span>•</span>
                                      <span>Duration: {rec.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    Save
                                  </Button>
                                  {rec.link && (
                                    <Button size="sm">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.type === 'user' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question or goal here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Try asking about specific skills, career goals, or learning paths
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("I want to learn machine learning")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Learn ML</h4>
                <p className="text-sm text-muted-foreground">Machine Learning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("What certifications should I get?")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Get Certified</h4>
                <p className="text-sm text-muted-foreground">Find certifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("Help me with career planning")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Career Plan</h4>
                <p className="text-sm text-muted-foreground">Strategic guidance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSuggestionClick("Show me upcoming events")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">Find Events</h4>
                <p className="text-sm text-muted-foreground">Networking opportunities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}