import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Area,
} from 'recharts';
import { revenueStats } from '../../services/dashServe';

interface RevenueDataItem {
  period: string;
  total: number;
}

export default function RevenueChart() {
  const [data, setData] = useState<RevenueDataItem[]>([]);
  const [periodType, setPeriodType] = useState<'this_week' | 'this_month' | 'this_year'>('this_month');
  const [revenueType, setRevenueType] = useState<'total_revenue' | 'platform_revenue'>('total_revenue');
  const [activePoint, setActivePoint] = useState<{period: string, total: number} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await revenueStats(periodType);
        const revenueData = response[revenueType];

        const transformedData = revenueData.map((item: any) => ({
          period: item.period,
          total: Number(item.total.toFixed(2)),
        }));

        setData(transformedData);
        setActivePoint(null); // Reset active point when data changes
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchData();
  }, [periodType, revenueType]);

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const clickedData = data.activePayload[0].payload;
      setActivePoint(clickedData);
    }
  };

  return (
    <div className="p-4 bg-white w-1/2 rounded-lg my-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Revenue</h2>
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="appearance-none bg-transparent pr-8 pl-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={revenueType}
              onChange={(e) => setRevenueType(e.target.value as 'total_revenue' | 'platform_revenue')}
            >
              <option value="total_revenue">Total Revenue</option>
              <option value="platform_revenue">Platform Revenue</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-transparent pr-8 pl-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as 'this_week' | 'this_month' | 'this_year')}
            >
              <option value="this_week">This week</option>
              <option value="this_month">This month</option>
              <option value="this_year">This year</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {activePoint && (
        <div className="mb-4 p-2 bg-gray-900 text-white rounded-md inline-block">
          <p className="font-bold">${activePoint.total.toLocaleString()}</p>
          <p className="text-xs text-gray-300">{activePoint.period}</p>
        </div>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          onClick={handleClick}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="period" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${value / 1000000}m`;
              if (value >= 1000) return `${value / 1000}k`;
              return value;
            }}
          />
          <CartesianGrid vertical={false} stroke="#EEF2F6" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, revenueType === 'total_revenue' ? 'Total Revenue' : 'Platform Revenue']}
            labelFormatter={(label) => label}
            cursor={false}
          />
          {activePoint && (
            <ReferenceLine 
              x={activePoint.period} 
              stroke="#4F46E5" 
              strokeDasharray="3 3" 
              strokeWidth={2}
            />
          )}
          <Area 
            type="monotone" 
            dataKey="total" 
            fill="url(#colorUv)" 
            fillOpacity={0.8}
            stroke="none"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#4F46E5', stroke: 'white', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
