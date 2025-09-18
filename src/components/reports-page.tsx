import { Download, TrendingUp, Users, Award, Calendar, BarChart3, PieChart, FileText } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const departmentData = [
  { department: "Computer Science", students: 1200, avgScore: 8.4, certifications: 456 },
  { department: "Electrical Engineering", students: 800, avgScore: 7.9, certifications: 234 },
  { department: "Mechanical Engineering", students: 950, avgScore: 7.6, certifications: 189 },
  { department: "Business Administration", students: 600, avgScore: 8.1, certifications: 145 },
];

const monthlyTrends = [
  { month: "Jan", submissions: 234, verified: 198, students: 156 },
  { month: "Feb", submissions: 267, verified: 231, students: 178 },
  { month: "Mar", submissions: 298, verified: 254, students: 201 },
  { month: "Apr", submissions: 312, verified: 276, students: 225 },
  { month: "May", submissions: 289, verified: 248, students: 198 },
  { month: "Jun", submissions: 334, verified: 287, students: 242 },
];

const skillCategories = [
  { name: "Technical Skills", value: 45, color: "#2563EB" },
  { name: "Leadership", value: 25, color: "#14B8A6" },
  { name: "Communication", value: 20, color: "#F59E0B" },
  { name: "Problem Solving", value: 10, color: "#10B981" },
];

const reportTemplates = [
  {
    title: "Student Achievement Summary",
    description: "Comprehensive overview of student accomplishments and certifications",
    type: "Monthly",
    lastGenerated: "2024-01-15",
    downloads: 45
  },
  {
    title: "Department Performance Analysis",
    description: "Comparative analysis across all departments and programs",
    type: "Quarterly",
    lastGenerated: "2024-01-10",
    downloads: 23
  },
  {
    title: "Skill Development Trends",
    description: "Analysis of emerging skills and learning patterns",
    type: "Weekly",
    lastGenerated: "2024-01-18",
    downloads: 67
  },
  {
    title: "Event Participation Report",
    description: "Student engagement in conferences, competitions, and workshops",
    type: "Monthly",
    lastGenerated: "2024-01-12",
    downloads: 34
  }
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights into student achievements and institutional performance</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current-semester">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Current Semester</SelectItem>
              <SelectItem value="last-semester">Last Semester</SelectItem>
              <SelectItem value="academic-year">Academic Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">3,550</p>
                <p className="text-xs text-green-600">+5.2% from last semester</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Impact Index</p>
                <p className="text-2xl font-bold">7.8</p>
                <p className="text-xs text-green-600">+0.3 improvement</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                <p className="text-2xl font-bold">1,024</p>
                <p className="text-xs text-green-600">+12.8% this semester</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Attended</p>
                <p className="text-2xl font-bold">2,156</p>
                <p className="text-xs text-green-600">+18.5% participation</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Student achievements by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#2563EB" name="Avg Impact Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity Trends</CardTitle>
            <CardDescription>Student submissions and engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="submissions" stroke="#2563EB" strokeWidth={2} name="Submissions" />
                <Line type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={2} name="Verified" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Category Distribution</CardTitle>
            <CardDescription>Breakdown of student competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={skillCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Certification Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Certification Growth</CardTitle>
            <CardDescription>Department-wise certification achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="certifications" fill="#14B8A6" name="Certifications" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Pre-configured reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {reportTemplates.map((report, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{report.title}</h4>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Last generated: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
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

      {/* Quick Insights */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-medium mb-1">Top Performing Department</h4>
              <p className="text-sm text-muted-foreground">Computer Science</p>
              <p className="text-xs text-green-600">8.4 avg impact score</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-medium mb-1">Fastest Growing Skill</h4>
              <p className="text-sm text-muted-foreground">Machine Learning</p>
              <p className="text-xs text-green-600">+45% this semester</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <h4 className="font-medium mb-1">Most Popular Certification</h4>
              <p className="text-sm text-muted-foreground">AWS Cloud Practitioner</p>
              <p className="text-xs text-green-600">156 students certified</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}