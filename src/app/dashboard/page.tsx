'use client';

import { useState, useEffect } from 'react';

type DashboardData = {
  month: string;
  totalPeopleHelped: number;
  totalEvents: number;
  totalFunds: number;
};

export default function DashboardPage() {
  const [month, setMonth] = useState('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (!month) return;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/dashboard?month=${month}`);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [month]);

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#f4a300] mb-8">
          Dashboard
        </h1>

        <div className="mb-6">
          <label className="block font-medium mb-1">Select Month (YYYY-MM)</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f4a300]"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#f4a300] text-white p-4 rounded-xl text-center shadow-md">
              <p className="text-lg font-semibold">People Helped</p>
              <p className="text-2xl">{data.totalPeopleHelped}</p>
            </div>
            <div className="bg-[#f4a300] text-white p-4 rounded-xl text-center shadow-md">
              <p className="text-lg font-semibold">Events Conducted</p>
              <p className="text-2xl">{data.totalEvents}</p>
            </div>
            <div className="bg-[#f4a300] text-white p-4 rounded-xl text-center shadow-md">
              <p className="text-lg font-semibold">Funds Utilized</p>
              <p className="text-2xl">₹{data.totalFunds}</p>
            </div>
          </div>
        ) : (
          month && <p className="text-center text-red-500 mt-4">No data found for selected month.</p>
        )}
      </div>
    </main>
  );
}
