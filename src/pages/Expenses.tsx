import { Navbar } from '@/components/Navbar';
import { ExpenseList } from '@/components/ExpenseList';

export default function Expenses() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6 lg:py-8">
        <ExpenseList />
      </main>
    </div>
  );
}
