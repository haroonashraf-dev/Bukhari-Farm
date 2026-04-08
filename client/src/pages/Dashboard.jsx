import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Users, Activity, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { useGetGoatsQuery } from '../features/goats/goatsApi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: goatsData, isLoading } = useGetGoatsQuery();

  const goats = goatsData?.data || [];
  const totalGoats = goats.length;

  // Process data for charts
  const statusCounts = goats.reduce((acc, goat) => {
    acc[goat.status] = (acc[goat.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.keys(statusCounts).map(key => ({ 
    name: key.charAt(0).toUpperCase() + key.slice(1), 
    value: statusCounts[key] 
  }));

  const breedCounts = goats.reduce((acc, goat) => {
    const breed = goat.breed || 'Unknown';
    acc[breed] = (acc[breed] || 0) + 1;
    return acc;
  }, {});
  const breedData = Object.keys(breedCounts).map(key => ({ 
    name: key, 
    count: breedCounts[key] 
  }));

  const genderCounts = goats.reduce((acc, goat) => {
    const gender = goat.gender || 'Unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.keys(genderCounts).map(key => ({ 
    name: key, 
    value: genderCounts[key] 
  }));

  const isAdmin = user?.role === 'admin';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Helmet>
        <title>Dashboard | Bukhari Farm</title>
      </Helmet>

      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
        <h1 className="text-3xl font-display font-bold text-stone-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-stone-600">
          Here is an overview of your farm's current status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 flex items-center">
          <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600 mr-6">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Total Goats</p>
            <h3 className="text-3xl font-bold text-stone-900 mt-1">
              {isLoading ? '...' : totalGoats}
            </h3>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 flex items-center">
          <div className="p-4 bg-blue-100 rounded-2xl text-blue-600 mr-6">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">Your Role</p>
            <h3 className="text-xl font-bold text-stone-900 mt-1 capitalize">
              {user?.role || 'Staff'}
            </h3>
          </div>
        </div>
      </div>

      {/* Admin Analytics Section */}
      {isAdmin && !isLoading && goats.length > 0 && (
        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-display font-bold text-stone-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-emerald-600" />
            Farm Analytics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6">
              <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2 text-stone-400" />
                Goat Status Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6">
              <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center">
                <PieChartIcon className="w-5 h-5 mr-2 text-stone-400" />
                Gender Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Breed Distribution */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-stone-400" />
                Breed Distribution
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={breedData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dx={-10} />
                    <Tooltip 
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
