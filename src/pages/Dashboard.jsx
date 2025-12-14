import { Navbar } from '@/components/Navbar.jsx';
import { DashboardCards } from '@/components/DashboardCards.jsx';
import { CategoryPieChart, MonthlyLineChart } from '@/components/Charts.jsx';
import { RecentExpenses } from '@/components/RecentExpenses.jsx';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Page Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your spending this month
          </p>
        </div>

        {/* Summary Cards */}
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <DashboardCards />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CategoryPieChart />
          <MonthlyLineChart />
        </div>

        {/* Recent Expenses */}
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <RecentExpenses />
        </div>
      </main>
    </div>
  );
}
