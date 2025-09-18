import { useState } from "react";
import { Download, Share2, QrCode, Eye, Edit, Award, Calendar, BookOpen, Users, ExternalLink, Copy, Check } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";

const portfolioData = {
  profile: {
    name: "Tharun",
    email: "231902@rajalakshmi.edu.in",
    phone: "+1 (555) 123-4567",
    university: "Rajalakshmi Engineering College",
    major: "Computer Science",
    year: "3rd Year",
    gpa: "8.2",
    impactIndex: 8.9,
    profileImage: "😁"
  },
  sections: {
    certifications: {
      enabled: true,
      items: [
        { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "2024-01-15", verified: true },
        { title: "Google Cloud Associate", issuer: "Google Cloud", date: "2023-12-10", verified: true },
        { title: "Machine Learning Specialization", issuer: "Stanford/Coursera", date: "2023-11-20", verified: true },
        { title: "React Developer Certification", issuer: "Meta", date: "2023-10-05", verified: true }
      ]
    },
    events: {
      enabled: true,
      items: [
        { title: "AI & ML Summit 2024", type: "Conference", date: "2024-01-20", verified: true },
        { title: "Tech Innovation Hackathon", type: "Competition", date: "2023-12-15", verified: true, placement: "2nd Place" },
        { title: "Google I/O 2023", type: "Conference", date: "2023-05-10", verified: true },
        { title: "GitHub Universe", type: "Conference", date: "2023-11-08", verified: true }
      ]
    },
    internships: {
      enabled: true,
      items: [
        { title: "Software Engineering Intern", company: "TechCorp", duration: "Summer 2023", verified: true },
        { title: "Data Science Intern", company: "DataFlow Inc", duration: "Winter 2023", verified: true },
        { title: "Google Summer of Code", company: "Open Source Project", duration: "Summer 2022", verified: true }
      ]
    },
    volunteering: {
      enabled: true,
      items: [
        { title: "Community Food Drive Leadership", organization: "Local Food Bank", hours: 45, date: "2024-01-10", verified: true },
        { title: "Coding Workshop Instructor", organization: "Youth Coding Club", hours: 30, date: "2023-12-20", verified: true },
        { title: "Environmental Cleanup", organization: "City Parks Dept", hours: 20, date: "2023-11-15", verified: true }
      ]
    }
  }
};

export function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("preview");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portfolioSettings, setPortfolioSettings] = useState(portfolioData.sections);

  const portfolioUrl = "https://skillfolio.app/portfolio/tharun-2025";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(portfolioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSectionToggle = (section: string, enabled: boolean) => {
    setPortfolioSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], enabled }
    }));
  };

  const totalItems = Object.values(portfolioData.sections).reduce((acc, section) => acc + section.items.length, 0);
  const verifiedItems = Object.values(portfolioData.sections).reduce((acc, section) => 
    acc + section.items.filter(item => item.verified).length, 0);
  const completionPercentage = Math.round((verifiedItems / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Portfolio Generator</h2>
          <p className="text-muted-foreground">Create and share your verified academic portfolio</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Portfolio Settings</DialogTitle>
                <DialogDescription>
                  Choose which sections to include in your portfolio
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {Object.entries(portfolioSettings).map(([key, section]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      <p className="text-sm text-muted-foreground">
                        {section.items.length} items
                      </p>
                    </div>
                    <Switch
                      checked={section.enabled}
                      onCheckedChange={(enabled) => handleSectionToggle(key, enabled)}
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
              <p className="text-sm text-muted-foreground">Portfolio Complete</p>
              <Progress value={completionPercentage} className="mt-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{verifiedItems}</div>
              <p className="text-sm text-muted-foreground">Verified Items</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{portfolioData.profile.impactIndex}</div>
              <p className="text-sm text-muted-foreground">Impact Index</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="share">Share & Export</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          {/* Portfolio Preview */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={portfolioData.profile.profileImage} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{portfolioData.profile.name}</CardTitle>
                  <CardDescription className="text-base">
                    {portfolioData.profile.major} • {portfolioData.profile.year} • {portfolioData.profile.university}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">GPA: {portfolioData.profile.gpa}</Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Impact Index: {portfolioData.profile.impactIndex}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Certifications */}
          {portfolioSettings.certifications.enabled && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <CardTitle>Certifications ({portfolioData.sections.certifications.items.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {portfolioData.sections.certifications.items.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">{new Date(cert.date).toLocaleDateString()}</p>
                      </div>
                      {cert.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Events */}
          {portfolioSettings.events.enabled && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <CardTitle>Events & Conferences ({portfolioData.sections.events.items.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.sections.events.items.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{event.type}</Badge>
                          {event.placement && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                              {event.placement}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      {event.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Internships */}
          {portfolioSettings.internships.enabled && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <CardTitle>Internships & Experience ({portfolioData.sections.internships.items.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.sections.internships.items.map((internship, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{internship.title}</h4>
                        <p className="text-sm text-muted-foreground">{internship.company}</p>
                        <p className="text-xs text-muted-foreground">{internship.duration}</p>
                      </div>
                      {internship.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Volunteering */}
          {portfolioSettings.volunteering.enabled && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <CardTitle>Volunteering & Community Service ({portfolioData.sections.volunteering.items.length})</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolioData.sections.volunteering.items.map((volunteer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{volunteer.title}</h4>
                        <p className="text-sm text-muted-foreground">{volunteer.organization}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{volunteer.hours} hours</span>
                          <span>•</span>
                          <span>{new Date(volunteer.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {volunteer.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Share Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Portfolio Link
                </CardTitle>
                <CardDescription>
                  Share your portfolio with a public link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={portfolioUrl} readOnly className="flex-1" />
                  <Button onClick={handleCopyLink} size="sm">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Preview
                  </Button>
                  <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
                    Share Options
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code
                </CardTitle>
                <CardDescription>
                  Generate a QR code for easy sharing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => setQrDialogOpen(true)}>
                    Generate QR Code
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Download Options */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Options
                </CardTitle>
                <CardDescription>
                  Export your portfolio in different formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                    <Download className="h-6 w-6" />
                    <span>PDF Portfolio</span>
                    <span className="text-xs text-muted-foreground">Complete portfolio</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                    <Download className="h-6 w-6" />
                    <span>Resume Format</span>
                    <span className="text-xs text-muted-foreground">Traditional resume</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col gap-2 h-auto p-4">
                    <Download className="h-6 w-6" />
                    <span>Data Export</span>
                    <span className="text-xs text-muted-foreground">JSON/CSV format</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Portfolio</DialogTitle>
            <DialogDescription>
              Share your portfolio via email or social media
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Email</Button>
              <Button variant="outline">LinkedIn</Button>
              <Button variant="outline">Twitter</Button>
              <Button variant="outline">Copy Link</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Portfolio QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to view the portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-8">
            <div className="w-48 h-48 bg-gray-100 border rounded-lg flex items-center justify-center">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
            <Button variant="outline">Print</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}