import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import { useLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: res.data, token: res.data.token }));
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to login');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Login | Bukhari Farm</title>
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-stone-200"
      >
        <div>
          <div className="mx-auto h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <LogIn className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-display font-bold text-stone-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Sign in to access the farm dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={onChange}
                  className="block w-full pl-10 pr-3 py-2 border border-stone-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
