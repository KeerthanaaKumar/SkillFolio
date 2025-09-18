import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye, Download, Users, TrendingUp, Award, FileText } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const pendingSubmissions = [
  {
    id: 1,
    student: { name: "John Doe", email: "john.doe@university.edu", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    title: "Google Cloud Professional Certification",
    type: "Certification",
    submittedDate: "2024-01-20",
    description: "Google Cloud Professional Cloud Architect certification",
    document: "gcp-cert.pdf",
    priority: "high"
  },
  {
    id: 2,
    student: { name: "Sarah Wilson", email: "sarah.wilson@university.edu", avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=40&h=40&fit=crop&crop=face" },
    title: "Startup Weekend Winner",
    type: "Competition",
    submittedDate: "2024-01-19",
    description: "First place in university startup weekend competition",
    document: "startup-cert.pdf",
    priority: "medium"
  },
  {
    id: 3,
    student: { name: "Mike Chen", email: "mike.chen@university.edu", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    title: "Community Teaching Program",
    type: "Volunteering",
    submittedDate: "2024-01-18",
    description: "60 hours teaching programming to underprivileged kids",
    document: "volunteer-hours.pdf",
    priority: "low"
  }
];

const analyticsData = {
  monthlySubmissions: [
    { month: "Jan", submissions: 45, verified: 38, rejected: 7 },
    { month: "Feb", submissions: 52, verified: 44, rejected: 8 },
    { month: "Mar", submissions: 38, verified: 32, rejected: 6 },
    { month: "Apr", submissions: 61, verified: 51, rejected: 10 },
    { month: "May", submissions: 48, verified: 40, rejected: 8 },
    { month: "Jun", submissions: 55, verified: 47, rejected: 8 }
  ],
  submissionTypes: [
    { name: "Certifications", value: 120, color: "#2563EB" },
    { name: "Events", value: 85, color: "#14B8A6" },
    { name: "Internships", value: 45, color: "#F59E0B" },
    { name: "Volunteering", value: 95, color: "#10B981" }
  ],
  studentActivity: [
    { month: "Jan", activeStudents: 234 },
    { month: "Feb", activeStudents: 267 },
    { month: "Mar", activeStudents: 298 },
    { month: "Apr", activeStudents: 312 },
    { month: "May", activeStudents: 289 },
    { month: "Jun", activeStudents: 334 }
  ]
};

const reports = [
  { name: "NAAC Accreditation Report", description: "Student achievement data for NAAC accreditation", type: "NAAC" },
  { name: "NIRF Ranking Submission", description: "Student participation metrics for NIRF ranking", type: "NIRF" },
  { name: "AICTE Annual Report", description: "Student skill development and industry engagement", type: "AICTE" },
  { name: "University Annual Report", description: "Comprehensive student achievement overview", type: "Internal" }
];

export function AdminPage() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [verificationDialog, setVerificationDialog] = useState(false);

  const handleVerification = (submissionId: number, action: 'approve' | 'reject') => {
    // Handle verification logic here
    console.log(`${action} submission ${submissionId}`);
    setVerificationDialog(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <p className="text-muted-foreground">Manage student submissions and generate institutional reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-blue-600">47</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified Total</p>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold text-purple-600">334</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verification" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verification">Verification Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="verification" className="space-y-6">
          {/* Verification Queue */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Review and verify student submissions</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="certification">Certifications</SelectItem>
                    <SelectItem value="event">Events</SelectItem>
                    <SelectItem value="internship">Internships</SelectItem>
                    <SelectItem value="volunteering">Volunteering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={submission.student.avatar} />
                          <AvatarFallback>{submission.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{submission.title}</h4>
                            <Badge className={getPriorityColor(submission.priority)}>
                              {submission.priority} priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{submission.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Student: {submission.student.name}</span>
                            <span>•</span>
                            <span>Type: {submission.type}</span>
                            <span>•</span>
                            <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVerification(submission.id, 'approve')}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleVerification(submission.id, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Submissions</CardTitle>
                <CardDescription>Submission trends over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.monthlySubmissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="verified" fill="#10B981" name="Verified" />
                    <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Types</CardTitle>
                <CardDescription>Distribution of submission categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.submissionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.submissionTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Activity Trends</CardTitle>
                <CardDescription>Active students over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.studentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="activeStudents" stroke="#2563EB" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Report Generation */}
          <Card>
            <CardHeader>
              <CardTitle>Institutional Reports</CardTitle>
              <CardDescription>Generate reports for accreditation and ranking bodies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {reports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{report.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Report Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create custom reports with specific metrics and date ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student-achievements">Student Achievements</SelectItem>
                      <SelectItem value="department-summary">Department Summary</SelectItem>
                      <SelectItem value="skill-analysis">Skill Analysis</SelectItem>
                      <SelectItem value="engagement-metrics">Engagement Metrics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full sm:w-auto">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}