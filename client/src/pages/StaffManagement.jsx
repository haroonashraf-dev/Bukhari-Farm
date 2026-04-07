import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Users, Shield, Trash2, Edit2, Check, X } from 'lucide-react';
import { useGetUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from '../features/auth/authApi';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

export default function StaffManagement() {
  const { user: currentUser } = useSelector((state) => state.auth);
  
  const { data, isLoading } = useGetUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [editingId, setEditingId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const users = data?.data || [];

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setSelectedRole(user.role);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSelectedRole('');
  };

  const handleSaveRole = async (id) => {
    try {
      await updateRole({ id, role: selectedRole }).unwrap();
      toast.success('User role updated successfully');
      setEditingId(null);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete user');
      }
    }
  };

  const canEditUser = (user) => {
    if (currentUser._id === user._id) return false; // Cannot edit self
    if (currentUser.role === 'manager' && user.role === 'admin') return false; // Managers cannot edit admins
    return true;
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Staff Management | Bukhari Farm</title>
      </Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-stone-900">Staff Management</h1>
          <p className="mt-1 text-sm text-stone-500">Manage user roles and access permissions.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Joined</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">Actions</th>
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
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-stone-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-stone-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-stone-900">{user.name}</div>
                          <div className="text-sm text-stone-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === user._id ? (
                        <select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="block w-full pl-3 pr-10 py-1.5 text-base border-stone-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                          <option value="staff">Staff</option>
                          <option value="manager">Manager</option>
                          {currentUser.role === 'admin' && <option value="admin">Admin</option>}
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                            'bg-stone-100 text-stone-800'}`}
                        >
                          {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                          {user.role}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === user._id ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleSaveRole(user._id)}
                              disabled={isUpdating}
                              className="h-8 w-8 p-0 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={handleCancelEdit}
                              className="h-8 w-8 p-0 rounded-lg text-stone-600 hover:text-stone-700 hover:bg-stone-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditClick(user)}
                              disabled={!canEditUser(user)}
                              className="h-8 w-8 p-0 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50"
                              title={!canEditUser(user) ? "Cannot edit this user" : "Edit Role"}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDelete(user._id)}
                              disabled={!canEditUser(user) || isDeleting}
                              className="h-8 w-8 p-0 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                              title={!canEditUser(user) ? "Cannot delete this user" : "Delete User"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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
