import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin, getMe } from '../store/authSlice';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLayers, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex bg-[linear-gradient(135deg,#eef2ff_0%,#ecfeff_45%,#f8fafc_100%)] dark:bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(79,70,229,0.16)_0%,rgba(79,70,229,0.06)_28%,transparent_28%,transparent_100%)] dark:bg-[radial-gradient(circle_at_18%_16%,rgba(47,54,255,0.18),transparent_16%),linear-gradient(90deg,#050505_0%,#050505_51%,transparent_51%)]" />
      <div className="absolute inset-y-0 right-0 hidden lg:block w-[48%] bg-[linear-gradient(145deg,rgba(79,70,229,0.95),rgba(6,182,212,0.9))] dark:bg-[linear-gradient(180deg,#020202_0%,#04061d_23%,#2932ff_52%,#eef2ff_82%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:44px_44px] dark:opacity-0" />
      {/* Left Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 sm:p-8 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#050505]/95 dark:shadow-black">
          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:border-[#343cff]/45 dark:bg-[#343cff] dark:text-white dark:shadow-lg dark:shadow-[#343cff]/30">
              <FiLayers /> Worksphere
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-textMain mb-2">Welcome Back</h1>
            <p className="text-textMuted">Sign in to manage your tasks and teams</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-textMuted dark:text-zinc-300 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted dark:text-zinc-400" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-white/85 dark:bg-[#1b1b1b] border border-textMain/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-textMain placeholder:text-textMuted/75 dark:placeholder:text-zinc-500 shadow-sm focus:ring-2 focus:ring-primary dark:focus:ring-[#343cff] focus:border-primary dark:focus:border-[#5c63ff] focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted dark:text-zinc-300 mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted dark:text-zinc-400" />
                <input 
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-white/85 dark:bg-[#1b1b1b] border border-textMain/10 dark:border-white/10 rounded-xl pl-10 pr-12 py-3 text-textMain placeholder:text-textMuted/75 dark:placeholder:text-zinc-500 shadow-sm focus:ring-2 focus:ring-primary dark:focus:ring-[#343cff] focus:border-primary dark:focus:border-[#5c63ff] focus:outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textMain transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-secondary dark:from-[#2f36ff] dark:to-[#4147ff] hover:shadow-xl hover:shadow-primary/25 dark:hover:shadow-[#343cff]/30 transition-all shadow-lg shadow-primary/20 dark:shadow-[#343cff]/20 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-textMuted">
            Don't have an account? <Link to="/signup" className="text-primary dark:text-white dark:hover:text-[#aeb2ff] hover:underline font-medium">Sign up</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Illustration Section */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center">
        <div className="relative z-10 max-w-lg text-center p-10 rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl shadow-2xl dark:border-white/10 dark:bg-black/10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg dark:bg-[#343cff] dark:text-white">
            <FiLayers className="text-5xl" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Organize Work With Clarity</h2>
          <p className="text-white/80 text-lg">Bring projects, teams, and daily priorities together in one focused workspace built for smooth collaboration.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
