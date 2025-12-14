import { DollarSign, TrendingUp, Receipt } from 'lucide-react';
import { useExpenseContext } from '@/contexts/ExpenseContext';
import { CATEGORY_ICONS } from '@/types/expense';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  gradient?: boolean;
}

function StatCard({ title, value, subtitle, icon, gradient }: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-card-lg ${
        gradient
          ? 'gradient-primary text-primary-foreground'
          : 'bg-card shadow-card'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={`text-sm font-medium ${gradient ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className={`text-sm ${gradient ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          gradient ? 'bg-primary-foreground/20' : 'bg-primary/10'
        }`}>
          {icon}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full ${
        gradient ? 'bg-primary-foreground/10' : 'bg-primary/5'
      }`} />
    </div>
  );
}

export function DashboardCards() {
  const { totalExpenses, highestCategory, transactionCount } = useExpenseContext();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <StatCard
        title="Total Monthly Expense"
        value={formatCurrency(totalExpenses)}
        subtitle="This month's spending"
        icon={<DollarSign className="h-6 w-6 text-primary-foreground" />}
        gradient
      />
      <StatCard
        title="Highest Spending"
        value={highestCategory ? `${CATEGORY_ICONS[highestCategory.category]} ${highestCategory.category}` : 'N/A'}
        subtitle={highestCategory ? formatCurrency(highestCategory.amount) : 'No expenses yet'}
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
      />
      <StatCard
        title="Transactions"
        value={transactionCount.toString()}
        subtitle="Total this month"
        icon={<Receipt className="h-6 w-6 text-primary" />}
      />
    </div>
  );
}
