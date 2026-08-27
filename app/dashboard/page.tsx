import Sidebar from "@/components/dashboard/sidebar";
import StatCard from "@/components/dashboard/StatCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PresenceSearch from "@/components/dashboard/PresenceSearch";
import PresenceList from "@/components/PresenceList";
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        
        <DashboardHeader />

        {/* Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Present Today"
            value={32}
            description="People present today"
          />

          <StatCard
            title="Expected"
            value={40}
            description="Expected today"
          />

          <StatCard
            title="Absent"
            value={8}
            description="People absent today"
          />

          <StatCard
            title="Attendance Rate"
            value="80%"
            description="Today's attendance"
          />
        </div>
        <div className="mt-8">
          <AttendanceChart />
        </div>

        <PresenceSearch />

        <PresenceList />
      </main>
    </div>
  );
}