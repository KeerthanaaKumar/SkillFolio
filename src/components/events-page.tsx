import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Star, Filter, Search, Bookmark, ExternalLink, Plus } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Summit 2024",
    type: "Conference",
    category: "Technical",
    date: "2024-02-15",
    endDate: "2024-02-17",
    location: "San Francisco, CA",
    organization: "Tech Innovators Association",
    description: "Join industry leaders for cutting-edge discussions on AI, ML, and their applications in various industries.",
    skillRelevance: ["Machine Learning", "Artificial Intelligence", "Data Science"],
    participants: 1200,
    rating: 4.8,
    price: "Free",
    registrationDeadline: "2024-02-10",
    isBookmarked: true,
    difficulty: "Intermediate",
    benefits: ["Networking", "Certification", "Career Development"]
  },
  {
    id: 2,
    title: "Google Summer of Code 2024",
    type: "Internship",
    category: "Technical",
    date: "2024-06-01",
    endDate: "2024-08-31",
    location: "Remote",
    organization: "Google",
    description: "Contribute to open source projects with mentorship from experienced developers.",
    skillRelevance: ["Software Development", "Open Source", "Programming"],
    participants: 1000,
    rating: 4.9,
    price: "$6,000 stipend",
    registrationDeadline: "2024-03-15",
    isBookmarked: false,
    difficulty: "Advanced",
    benefits: ["Stipend", "Mentorship", "Open Source Experience"]
  },
  {
    id: 3,
    title: "Global Climate Action Hackathon",
    type: "Competition",
    category: "Social Impact",
    date: "2024-02-20",
    endDate: "2024-02-22",
    location: "Online",
    organization: "Climate Tech Alliance",
    description: "48-hour hackathon focused on developing solutions for climate change challenges.",
    skillRelevance: ["Problem Solving", "Innovation", "Sustainability"],
    participants: 500,
    rating: 4.7,
    price: "Free",
    registrationDeadline: "2024-02-18",
    isBookmarked: true,
    difficulty: "Beginner to Advanced",
    benefits: ["Prizes", "Networking", "Social Impact"]
  },
  {
    id: 4,
    title: "Community Food Bank Volunteer Program",
    type: "Volunteering",
    category: "Community Service",
    date: "2024-02-10",
    endDate: "2024-12-31",
    location: "Local Community Center",
    organization: "City Food Bank",
    description: "Regular volunteer opportunities to help sort and distribute food to families in need.",
    skillRelevance: ["Leadership", "Community Service", "Organization"],
    participants: 200,
    rating: 4.9,
    price: "Free",
    registrationDeadline: "Ongoing",
    isBookmarked: false,
    difficulty: "Beginner",
    benefits: ["Community Impact", "Leadership Skills", "Service Hours"]
  },
  {
    id: 5,
    title: "Startup Leadership Bootcamp",
    type: "Workshop",
    category: "Leadership",
    date: "2024-03-01",
    endDate: "2024-03-03",
    location: "New York, NY",
    organization: "Entrepreneur Academy",
    description: "Intensive 3-day program for aspiring leaders in the startup ecosystem.",
    skillRelevance: ["Leadership", "Entrepreneurship", "Business Strategy"],
    participants: 100,
    rating: 4.6,
    price: "$299",
    registrationDeadline: "2024-02-25",
    isBookmarked: false,
    difficulty: "Intermediate",
    benefits: ["Certificate", "Networking", "Mentorship"]
  },
  {
    id: 6,
    title: "Microsoft Student Ambassador Program",
    type: "Leadership",
    category: "Professional Development",
    date: "2024-09-01",
    endDate: "2025-08-31",
    location: "Global (Remote + Local)",
    organization: "Microsoft",
    description: "Year-long program to develop leadership skills while representing Microsoft on campus.",
    skillRelevance: ["Leadership", "Public Speaking", "Technology Advocacy"],
    participants: 300,
    rating: 4.8,
    price: "Free + Benefits",
    registrationDeadline: "2024-04-30",
    isBookmarked: true,
    difficulty: "Intermediate",
    benefits: ["Mentorship", "Microsoft Resources", "Leadership Development"]
  }
];

const eventTypes = ["All", "Conference", "Competition", "Internship", "Volunteering", "Workshop", "Leadership"];
const categories = ["All", "Technical", "Social Impact", "Community Service", "Leadership", "Professional Development"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Beginner to Advanced"];

export function EventsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === "All" || event.type === selectedType;
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || event.difficulty === selectedDifficulty;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.skillRelevance.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBookmark = !showBookmarkedOnly || event.isBookmarked;
    
    return matchesType && matchesCategory && matchesDifficulty && matchesSearch && matchesBookmark;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Conference":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Competition":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Internship":
        return "bg-green-100 text-green-800 border-green-200";
      case "Volunteering":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Workshop":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "Leadership":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Event Discovery</h2>
          <p className="text-muted-foreground">Discover opportunities to grow your skills and expand your network</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={showBookmarkedOnly ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Bookmarked
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events, skills, or organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <Badge className={getTypeColor(event.type)}>
                  {event.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    // Toggle bookmark functionality would go here
                  }}
                >
                  <Bookmark 
                    className={`h-4 w-4 ${event.isBookmarked ? 'fill-current text-primary' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>
              <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
              <CardDescription className="text-sm">{event.organization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDate(event.date)}
                    {event.endDate !== event.date && ` - ${formatDate(event.endDate)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>online</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span>{event.rating}/5.0</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">RELEVANT SKILLS</p>
                <div className="flex flex-wrap gap-1">
                  {event.skillRelevance.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {event.skillRelevance.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{event.skillRelevance.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">BENEFITS</p>
                <div className="flex flex-wrap gap-1">
                  {event.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-medium">{event.price}</p>
                  <p className="text-xs text-muted-foreground">
                    Apply by {event.registrationDeadline}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="h-3 w-3" />
                    Apply
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms to discover more opportunities.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedType("All");
                setSelectedCategory("All");
                setSelectedDifficulty("All");
                setShowBookmarkedOnly(false);
              }}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}