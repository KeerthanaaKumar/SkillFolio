import { Award, BookOpen, Calendar, Users } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const recentAchievements = [
  { title: "AWS Cloud Practitioner", type: "Certification", date: "2 days ago", status: "verified" },
  { title: "Tech Conference 2024", type: "Event", date: "1 week ago", status: "pending" },
  { title: "Community Cleanup Drive", type: "Volunteering", date: "2 weeks ago", status: "verified" },
  { title: "Startup Internship", type: "Internship", date: "1 month ago", status: "verified" },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Student Profile Summary */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-4xl">👨‍🎓</span>
              </div>
              <h3 className="font-semibold">Tharun</h3>
              <p className="text-sm text-muted-foreground mb-2">Computer Science, Year 3</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8.7</div>
                  <div className="text-xs text-muted-foreground">GPA</div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Profile Completion</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="md:col-span-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[24px]">5</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1</span> this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Internships</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1</span> this month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest submissions and activities</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    achievement.type === 'Certification' ? 'bg-blue-100 text-blue-600' :
                    achievement.type === 'Event' ? 'bg-teal-100 text-teal-600' :
                    achievement.type === 'Volunteering' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {achievement.type === 'Certification' && <Award className="h-4 w-4" />}
                    {achievement.type === 'Event' && <Calendar className="h-4 w-4" />}
                    {achievement.type === 'Volunteering' && <Users className="h-4 w-4" />}
                    {achievement.type === 'Internship' && <BookOpen className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.type} • {achievement.date}</p>
                  </div>
                </div>
                <Badge 
                  variant={achievement.status === 'verified' ? 'default' : 'secondary'}
                  className={achievement.status === 'verified' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                >
                  {achievement.status === 'verified' ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}