import { getSession } from "@/lib/auth";
import { getPlans, getSettings } from "@/lib/data";
import { DepositForm } from "./DepositForm";

export const dynamic = "force-dynamic";

export default async function DepositPage() {
  const [plans, settings] = await Promise.all([
    getPlans(),
    getSettings(),
  ]);

  const plansData = plans.map((p) => ({
    id: p.id,
    name: p.name,
    amount: p.amount,
    dailyProfit: p.dailyProfit,
    totalProfit: p.totalProfit,
  }));

  // ✅ Sirf OPay — settings se aata hai
  const paymentMethods = [
    {
      id: "opay",
      label: "OPay",
      icon: "💳",
      accountName: "Muhammad Shahzad Pervaiz",
      accountNumber: "03320613270",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0a2e1c]">Make a Deposit</h1>
        <p className="text-sm text-black/60">
          Pay via OPay, then submit your payment proof for approval.
        </p>
      </div>

      <DepositForm plans={plansData} paymentMethods={paymentMethods} />
    </div>
  );
}