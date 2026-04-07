import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { UploadCloud, X } from 'lucide-react';
import { useGetGoatByIdQuery, useUpdateGoatMutation, useUploadImageMutation } from '../features/goats/goatsApi';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

export default function EditGoat() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: goatResponse, isLoading: isFetching } = useGetGoatByIdQuery(id);
  const [updateGoat, { isLoading: isUpdating }] = useUpdateGoatMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState({
    tagNumber: '',
    name: '',
    breed: '',
    gender: 'Female',
    dateOfBirth: '',
    color: '',
    status: 'active',
    notes: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (goatResponse?.data) {
      const goat = goatResponse.data;
      setFormData({
        tagNumber: goat.tagNumber || '',
        name: goat.name || '',
        breed: goat.breed || '',
        gender: goat.gender || 'Female',
        dateOfBirth: goat.dateOfBirth ? goat.dateOfBirth.split('T')[0] : '',
        color: goat.color || '',
        status: goat.status || 'active',
        notes: goat.notes || '',
        image: goat.image || '',
      });
      if (goat.image) {
        setImagePreview(goat.image);
      }
    }
  }, [goatResponse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    try {
      const res = await uploadImage(file).unwrap();
      setFormData((prev) => ({ ...prev, image: res.imageUrl }));
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload image');
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGoat({ id, ...formData }).unwrap();
      toast.success('Goat updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.data?.message || 'Failed to update goat');
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Helmet>
        <title>Edit Goat | Bukhari Farm</title>
        <meta name="description" content={`Edit goat details in the Bukhari Farm management system.`} />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-stone-900">Edit Goat</h1>
        <p className="mt-2 text-sm text-stone-500">Update the details of the goat.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Image Upload Column */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-stone-700 mb-2">Goat Photo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-200 border-dashed rounded-2xl hover:border-emerald-500 transition-colors bg-stone-50 relative group">
              {imagePreview ? (
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setFormData(p => ({...p, image: ''})) }}
                    className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full text-stone-700 hover:text-red-600 backdrop-blur-sm transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2 text-center py-8">
                  <UploadCloud className="mx-auto h-10 w-10 text-stone-400 group-hover:text-emerald-500 transition-colors" />
                  <div className="flex text-sm text-stone-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                      <span>Upload a photo</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  <p className="text-xs text-stone-500">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Tag Number *" name="tagNumber" value={formData.tagNumber} onChange={handleChange} required placeholder="e.g. BF-001" />
              <Input label="Name (Optional)" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Bella" />
              
              <div className="w-full">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Breed *</label>
                <select name="breed" value={formData.breed} onChange={handleChange} required className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm">
                  <option value="">Select Breed</option>
                  <option value="Boer">Boer</option>
                  <option value="Beetal">Beetal</option>
                  <option value="Kamori">Kamori</option>
                  <option value="Teddy">Teddy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm">
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <Input label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              <Input label="Color" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. White & Brown" />

              <div className="w-full sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} required className="flex h-11 w-full rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm">
                  <option value="active">Active</option>
                  <option value="pregnant">Pregnant</option>
                  <option value="sold">Sold</option>
                  <option value="dead">Dead</option>
                </select>
              </div>

              <div className="w-full sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="flex w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm placeholder:text-stone-400" placeholder="Any additional health notes or details..."></textarea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-5 bg-stone-50 border-t border-stone-200 flex items-center justify-end space-x-3">
          <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Button type="submit" isLoading={isUpdating || isUploading}>Update Goat</Button>
        </div>
      </form>
    </motion.div>
  );
}
