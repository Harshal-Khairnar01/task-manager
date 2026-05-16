import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/authSlice';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Member');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signupUser({ name, email, password, role, adminCode }));
    if (signupUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-[linear-gradient(135deg,#f0fdfa_0%,#eef2ff_48%,#f8fafc_100%)] dark:bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(65deg,rgba(6,182,212,0.16)_0%,rgba(6,182,212,0.06)_30%,transparent_30%,transparent_100%)] dark:bg-none" />
      <div className="absolute inset-y-0 left-0 hidden lg:block w-[48%] bg-[linear-gradient(145deg,rgba(6,182,212,0.94),rgba(79,70,229,0.9))] dark:bg-surface" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:44px_44px] dark:opacity-0" />
      {/* Left Illustration Section */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center order-2 lg:order-1">
        <div className="relative z-10 max-w-lg text-center p-10 rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl shadow-2xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-white shadow-lg">
            <FiCheckCircle className="text-5xl" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Join Your Team Today</h2>
          <p className="text-white/80 text-lg">Create projects, track progress, and conquer your goals with our beautiful task management suite.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 z-10 order-1 lg:order-2">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-6 sm:p-8 shadow-2xl shadow-secondary/10 backdrop-blur-xl dark:border-textMain/10 dark:bg-surface/80">
          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <FiCheckCircle /> Worksphere
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-textMain mb-2">Create Account</h1>
            <p className="text-textMuted">Join us and start managing tasks</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full bg-white/85 dark:bg-background/40 border border-textMain/10 rounded-xl pl-10 pr-4 py-3 text-textMain shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-white/85 dark:bg-background/40 border border-textMain/10 rounded-xl pl-10 pr-4 py-3 text-textMain shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                <input 
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-white/85 dark:bg-background/40 border border-textMain/10 rounded-xl pl-10 pr-12 py-3 text-textMain shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none transition-all"
                  placeholder="Create a password"
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

            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Role</label>
              <select 
                value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/85 dark:bg-background/40 border border-textMain/10 rounded-xl px-4 py-3 text-textMain shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary focus:outline-none transition-all"
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {role === 'Admin' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <label className="block text-sm font-medium text-textMuted mb-1">Admin Secret Key</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input 
                    type={showAdminCode ? 'text' : 'password'} value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required={role === 'Admin'}
                    className="w-full bg-white/85 dark:bg-background/40 border border-danger/30 rounded-xl pl-10 pr-12 py-3 text-textMain shadow-sm focus:ring-2 focus:ring-danger focus:border-danger focus:outline-none transition-all"
                    placeholder="Enter secret admin key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminCode(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textMain transition-colors"
                    aria-label={showAdminCode ? 'Hide admin secret key' : 'Show admin secret key'}
                  >
                    {showAdminCode ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>
            )}

            <button 
              type="submit" disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-secondary to-primary hover:shadow-xl hover:shadow-secondary/25 transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-textMuted">
            Already have an account? <Link to="/login" className="text-secondary hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
