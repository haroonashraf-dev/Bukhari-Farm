import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Users, Activity } from 'lucide-react';
import { useGetGoatsQuery } from '../features/goats/goatsApi';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: goatsData, isLoading } = useGetGoatsQuery();

  const totalGoats = goatsData?.data?.length || 0;

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
    </motion.div>
  );
}
