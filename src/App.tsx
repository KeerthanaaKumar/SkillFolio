import { useState } from "react";
import { DashboardLayout } from "./components/dashboard-layout";
import { DashboardPage } from "./components/dashboard-page";
import { SubmissionsPage } from "./components/submissions-page";
import { EventsPage } from "./components/events-page";
import { PortfolioPage } from "./components/portfolio-page";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPage />;
      case "submissions":
        return <SubmissionsPage />;
      case "events":
        return <EventsPage />;
      case "portfolio":
        return <PortfolioPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}