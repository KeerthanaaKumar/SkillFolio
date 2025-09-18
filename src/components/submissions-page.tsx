import { useState } from "react";
import { Upload, Filter, Search, Plus, FileText, Award, Calendar, Users, BookOpen, CheckCircle, Clock, XCircle } from "./icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const submissions = [
  {
    id: 1,
    title: "AWS Cloud Practitioner Certification",
    type: "Certification",
    category: "Technical",
    submittedDate: "2024-01-15",
    status: "approved",
    verifiedBy: "Dr. Sarah Johnson",
    description: "AWS Cloud Practitioner certification demonstrating cloud computing fundamentals",
    document: "aws-cert.pdf"
  },
  {
    id: 2,
    title: "Tech Innovation Conference 2024",
    type: "Conference",
    category: "Professional Development",
    submittedDate: "2024-01-10",
    status: "pending",
    verifiedBy: null,
    description: "Attended 3-day technology conference with sessions on AI, blockchain, and cloud computing",
    document: "conference-cert.pdf"
  },
  {
    id: 3,
    title: "Google Summer of Code",
    type: "Internship",
    category: "Technical",
    submittedDate: "2024-01-08",
    status: "rejected",
    verifiedBy: "Prof. Michael Chen",
    description: "3-month internship contributing to open source projects",
    document: "gsoc-letter.pdf",
    rejectionReason: "Document quality insufficient - please resubmit with clearer documentation"
  },
  {
    id: 4,
    title: "Community Food Drive Leadership",
    type: "Volunteering",
    category: "Community Service",
    submittedDate: "2024-01-05",
    status: "approved",
    verifiedBy: "Ms. Jennifer Davis",
    description: "Led organization of community food drive, coordinated 50+ volunteers",
    document: "volunteer-cert.pdf"
  },
  {
    id: 5,
    title: "Machine Learning Specialization",
    type: "Certification",
    category: "Technical",
    submittedDate: "2024-01-03",
    status: "pending",
    verifiedBy: null,
    description: "Completed Stanford's Machine Learning course series on Coursera",
    document: "ml-cert.pdf"
  }
];

const activityTypes = ["All", "Certification", "Conference", "Competition", "Internship", "Volunteering", "Leadership"];
const statusTypes = ["All", "Pending", "Approved", "Rejected"];

export function SubmissionsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesType = selectedType === "All" || submission.type === selectedType;
    const matchesStatus = selectedStatus === "All" || submission.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Certification":
        return <Award className="h-4 w-4" />;
      case "Conference":
        return <Calendar className="h-4 w-4" />;
      case "Internship":
        return <BookOpen className="h-4 w-4" />;
      case "Volunteering":
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Upload Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Submissions</h2>
          <p className="text-muted-foreground">Upload and track your achievements, certifications, and activities</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Achievement</DialogTitle>
              <DialogDescription>
                Submit your certificates, internship letters, or volunteering proof for verification.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., AWS Cloud Practitioner Certification" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Activity Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="volunteering">Volunteering</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Briefly describe this achievement..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="document">Upload Document</Label>
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)}>
                  Submit for Verification
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusTypes.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${
                    submission.type === 'Certification' ? 'bg-blue-100 text-blue-600' :
                    submission.type === 'Conference' ? 'bg-teal-100 text-teal-600' :
                    submission.type === 'Internship' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {getTypeIcon(submission.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{submission.title}</h3>
                      {getStatusIcon(submission.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{submission.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>Type: {submission.type}</span>
                      <span>•</span>
                      <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                      {submission.verifiedBy && (
                        <>
                          <span>•</span>
                          <span>Verified by: {submission.verifiedBy}</span>
                        </>
                      )}
                    </div>
                    {submission.status === 'rejected' && submission.rejectionReason && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                        <strong>Rejection Reason:</strong> {submission.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  {getStatusBadge(submission.status)}
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No submissions found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedType !== "All" || selectedStatus !== "All" 
                  ? "Try adjusting your filters or search terms"
                  : "Start by uploading your first achievement or certification"
                }
              </p>
              {!searchTerm && selectedType === "All" && selectedStatus === "All" && (
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload First Submission
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}