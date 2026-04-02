import { ChartsContainer } from "@/src/components/dashboard/ChartsContainer";
import { SummaryCards } from "@/src/components/dashboard/SummaryCards";
import { TransactionTable } from "@/src/components/transactions/TransactionTable";



export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-400">Dashboard Overview</h2>
      </div>
      
      <SummaryCards />
      <ChartsContainer />
      <TransactionTable />
    </div>
  );
}