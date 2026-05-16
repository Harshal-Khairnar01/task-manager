import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin, getMe } from '../store/authSlice';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLayers } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(googleLogin({ token }));
      dispatch(getMe()).then(() => {
        navigate('/');
      });
    }
  }, [searchParams, dispatch, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-textMain mb-2">Welcome Back</h1>
            <p className="text-textMuted">Sign in to manage your tasks and teams</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-surface border border-textMain/10 rounded-xl pl-10 pr-4 py-3 text-textMain focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-surface border border-textMain/10 rounded-xl pl-10 pr-4 py-3 text-textMain focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-textMuted">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden lg:flex flex-1 relative bg-surface items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-lg text-center p-8 glass rounded-3xl border border-textMain/10 shadow-2xl">
          <FiLayers className="text-6xl text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Organize Work With Clarity</h2>
          <p className="text-textMuted text-lg">Bring projects, teams, and daily priorities together in one focused workspace built for smooth collaboration.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
