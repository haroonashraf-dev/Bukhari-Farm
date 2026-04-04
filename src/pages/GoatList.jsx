import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Search, Filter, Eye, Edit, Trash2, Plus, Activity, Users, Heart } from 'lucide-react';
import { useGetGoatsQuery, useArchiveGoatMutation } from '../features/goats/goatsApi';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import toast from 'react-hot-toast';

export default function GoatList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const { data, isLoading } = useGetGoatsQuery({ search: searchTerm, status: statusFilter });
  const [archiveGoat] = useArchiveGoatMutation();

  const handleArchive = async (id) => {
    if (window.confirm('Are you sure you want to archive this goat?')) {
      try {
        await archiveGoat(id).unwrap();
        toast.success('Goat archived successfully');
      } catch (err) {
        toast.error('Failed to archive goat');
      }
    }
  };

  const goats = data?.data || [];
  const totalGoats = goats.length;
  const activeGoats = goats.filter(g => g.status === 'active').length;
  const pregnantGoats = goats.filter(g => g.status === 'pregnant').length;

  const stats = [
    { name: 'Total Herd', value: totalGoats, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Active Goats', value: activeGoats, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Pregnant', value: pregnantGoats, icon: Heart, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Goat Management Dashboard | Bukhari Farm</title>
        <meta name="description" content="Manage your goat herd, track status, and monitor health at Bukhari Farm." />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-stone-900">Herd Overview</h1>
          <p className="mt-1 text-sm text-stone-500">Manage and monitor your livestock efficiently.</p>
        </div>
        <Link to="/dashboard/add">
          <Button className="w-full sm:w-auto shadow-emerald-600/20 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Goat
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-500">{stat.name}</p>
              <p className="text-2xl font-display font-bold text-stone-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Tag or Name..."
            className="block w-full pl-10 pr-3 py-2.5 border border-stone-200 rounded-xl leading-5 bg-stone-50 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 sm:text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-stone-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-2.5 border border-stone-200 rounded-xl leading-5 bg-stone-50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 sm:text-sm transition-all appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pregnant">Pregnant</option>
            <option value="sold">Sold</option>
            <option value="dead">Dead</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50/50">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Goat Info</th>
                <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Breed & Gender</th>
                <th scope="col" className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                  </td>
                </tr>
              ) : goats.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-stone-500">
                    No goats found matching your criteria.
                  </td>
                </tr>
              ) : (
                goats.map((goat, index) => (
                  <motion.tr 
                    key={goat._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-stone-50/80 transition-colors group"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                          <img 
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-cover border border-stone-200" 
                            src={goat.image || `https://ui-avatars.com/api/?name=${goat.name}&background=random`} 
                            alt={goat.name} 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-sm font-bold text-stone-900">{goat.name}</div>
                          <div className="text-xs sm:text-sm text-stone-500 font-mono mt-0.5">{goat.tagNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-stone-900 font-medium">{goat.breed}</div>
                      <div className="text-sm text-stone-500">{goat.gender}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <Badge status={goat.status}>{goat.status.charAt(0).toUpperCase() + goat.status.slice(1)}</Badge>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <Link to={`/dashboard/goat/${goat._id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleArchive(goat._id)}
                          className="h-8 w-8 p-0 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
