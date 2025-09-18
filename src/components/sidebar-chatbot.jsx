import { useState } from "react";
import { Send, Bot, User, ChevronDownIcon, ChevronUpIcon, MessageSquare } from "./icons.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Badge } from "./ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { ScrollArea } from "./ui/scroll-area.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible.jsx";

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    content: "Hi! I'm your chatbot assistant. How can I help you today?",
    timestamp: new Date(),
    suggestions: [
      "Help with skills",
      "Career advice",
      "Find events",
      "Learning paths"
    ]
  }
];

export function SidebarChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
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
    }, 1000);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "Great! I can help you identify skills to develop. What field are you interested in?",
        timestamp: new Date(),
        suggestions: [
          "Web development",
          "Data science",
          "DevOps",
          "Machine learning"
        ]
      };
    } else if (lowerMessage.includes('career')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "I'd be happy to help with career advice! What specific area would you like guidance on?",
        timestamp: new Date(),
        suggestions: [
          "Job search tips",
          "Interview prep",
          "Skill gaps",
          "Career planning"
        ]
      };
    } else if (lowerMessage.includes('event')) {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "Check out the Events page for upcoming workshops and networking opportunities!",
        timestamp: new Date(),
        suggestions: [
          "Tech conferences",
          "Workshops",
          "Networking events",
          "Career fairs"
        ]
      };
    } else {
      return {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm here to help! You can ask me about skills, career advice, events, or learning paths.",
        timestamp: new Date(),
        suggestions: [
          "What skills should I learn?",
          "Help with my portfolio",
          "Find upcoming events",
          "Career guidance"
        ]
      };
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="border-t">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto border-0 rounded-none"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Chatbot</span>
            </div>
            {isOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="p-4 pt-0">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              {/* Chat Messages */}
              <ScrollArea className="h-64 p-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'bot' && (
                        <Avatar className="h-6 w-6 mt-1 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                        <div className={`rounded-lg p-2 text-xs ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground ml-auto' 
                            : 'bg-muted'
                        }`}>
                          <p>{message.content}</p>
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.suggestions.slice(0, 2).map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-6 px-2"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {message.type === 'user' && (
                        <Avatar className="h-6 w-6 mt-1 flex-shrink-0">
                          <AvatarFallback className="text-xs">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-2">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    className="flex-1 h-8 text-xs"
                  />
                  <Button 
                    onClick={() => handleSendMessage(inputValue)} 
                    disabled={!inputValue.trim()}
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}