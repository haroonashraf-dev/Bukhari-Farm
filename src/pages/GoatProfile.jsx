import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, Info, Activity } from 'lucide-react';
import { useGetGoatByIdQuery } from '../features/goats/goatsApi';
import Badge from '../components/common/Badge';
import { format } from 'date-fns';

export default function GoatProfile() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetGoatByIdQuery(id);

  if (isLoading) {
    return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div></div>;
  }

  if (isError || !data?.data) {
    return <div className="text-center py-20 text-stone-500">Goat not found.</div>;
  }

  const goat = data.data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <Helmet>
        <title>{goat.name} ({goat.tagNumber}) | Bukhari Farm</title>
        <meta name="description" content={`Profile and health details for ${goat.name}, a ${goat.breed} goat at Bukhari Farm.`} />
      </Helmet>

      <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-2/5 bg-stone-100 relative">
            <img 
              src={goat.image || 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=800'} 
              alt={goat.name} 
              className="h-full w-full object-cover aspect-square md:aspect-auto absolute inset-0"
            />
            {/* Aspect ratio spacer for mobile */}
            <div className="pb-[100%] md:pb-0"></div>
          </div>
          <div className="md:w-3/5 p-8 md:p-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-display font-bold text-stone-900 tracking-tight">{goat.name}</h1>
                  <Badge status={goat.status} className="text-sm px-4 py-1.5">{goat.status.charAt(0).toUpperCase() + goat.status.slice(1)}</Badge>
                </div>
                <p className="text-stone-500 flex items-center font-mono bg-stone-100 inline-flex px-3 py-1 rounded-lg text-sm">
                  <Tag className="h-4 w-4 mr-2 text-stone-400" /> {goat.tagNumber}
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-stone-400 flex items-center uppercase tracking-wider"><Info className="h-4 w-4 mr-2" /> Breed</h3>
                  <p className="mt-1.5 text-lg text-stone-900 font-medium">{goat.breed}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-stone-400 flex items-center uppercase tracking-wider"><Activity className="h-4 w-4 mr-2" /> Gender</h3>
                  <p className="mt-1.5 text-lg text-stone-900 font-medium">{goat.gender}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-stone-400 flex items-center uppercase tracking-wider"><Calendar className="h-4 w-4 mr-2" /> Date of Birth</h3>
                  <p className="mt-1.5 text-lg text-stone-900 font-medium">
                    {goat.dateOfBirth ? format(new Date(goat.dateOfBirth), 'MMM dd, yyyy') : 'Unknown'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">Color</h3>
                  <p className="mt-1.5 text-lg text-stone-900 font-medium">{goat.color || 'N/A'}</p>
                </div>
              </div>
            </div>

            {goat.notes && (
              <div className="mt-10 pt-8 border-t border-stone-100">
                <h3 className="text-sm font-medium text-stone-400 mb-3 uppercase tracking-wider">Health Notes & Details</h3>
                <p className="text-stone-700 bg-stone-50 p-5 rounded-2xl text-base leading-relaxed border border-stone-100">
                  {goat.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
