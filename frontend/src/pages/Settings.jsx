import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, deleteAccount, upgradeAccount } from '../store/authSlice';
import { motion } from 'framer-motion';
import {
  FiAlertTriangle,
  FiBell,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMoon,
  FiShield,
  FiSun,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.36, ease: 'easeOut' },
  }),
};

const Toggle = ({ label, defaultChecked = true }) => (
  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-textMain/10 bg-background/70 p-3 transition hover:border-primary/30 hover:bg-primary/5">
    <span className="text-sm font-medium text-textMain">{label}</span>
    <input type="checkbox" className="peer sr-only" defaultChecked={defaultChecked} />
    <span className="relative h-6 w-11 rounded-full bg-textMain/15 transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-primary peer-checked:after:translate-x-5" />
  </label>
);

const Settings = () => {
  const { user, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminCode, setShowAdminCode] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.classList.contains('dark') ? 'dark' : 'light');

  const initial = (name || user?.name || 'U').charAt(0).toUpperCase();

  const toggleTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(newTheme);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { name, email };
    if (password) data.password = password;
    if (avatar) data.avatar = avatar;
    dispatch(updateProfile(data));
  };

  const handleUpgrade = (e) => {
    e.preventDefault();
    dispatch(upgradeAccount(adminCode)).then(() => {
      setAdminCode('');
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action is permanent and all your personal data will be removed.')) {
      dispatch(deleteAccount()).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/login');
        }
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl space-y-6"
    >
      <motion.section
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6 lg:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_30%)]" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <FiShield /> Account center
            </div>
            <h1 className="text-2xl font-bold text-textMain sm:text-3xl">Settings</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-textMuted">
              Manage your profile, workspace preferences, security, and account access.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-4 rounded-2xl border border-textMain/10 bg-background/70 p-4"
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" className="h-14 w-14 rounded-2xl object-cover shadow-lg" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl font-bold text-white shadow-lg">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-semibold text-textMain">{user?.name}</p>
              <p className="truncate text-sm text-textMuted">{user?.email}</p>
              <span className="mt-1 inline-flex rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                {user?.role}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.8fr]">
        <motion.section
          variants={cardVariants}
          custom={1}
          className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FiUser size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-textMain">Profile Information</h2>
              <p className="text-sm text-textMuted">Update your identity across Worksphere.</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="rounded-2xl border border-textMain/10 bg-background/70 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover shadow-lg" />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white shadow-lg">
                    {initial}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-sm font-medium text-textMuted">Avatar URL</label>
                  <input
                    type="text"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-textMain/10 bg-surface p-3 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-textMuted">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-textMain/10 bg-background/70 p-3 pl-10 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-textMuted">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-textMain/10 bg-background/70 p-3 pl-10 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-textMain/10 bg-background/70 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-textMain">
                <FiLock className="text-secondary" /> Change Password
              </h3>
              <label className="mb-1 block text-sm font-medium text-textMuted">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full rounded-xl border border-textMain/10 bg-surface p-3 pr-12 text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-textMuted transition hover:bg-textMain/5 hover:text-textMain"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-50"
              >
                <FiCheck /> {isLoading ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </form>
        </motion.section>

        <div className="space-y-6">
          {user?.role === 'Member' && (
            <motion.section
              variants={cardVariants}
              custom={2}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                  <FiShield size={22} />
                </div>
                <div>
                  <h2 className="font-bold text-primary">Upgrade to Admin</h2>
                  <p className="text-sm text-textMuted">Enter the secret key to unlock admin tools.</p>
                </div>
              </div>
              <form onSubmit={handleUpgrade} className="space-y-3">
                <div className="relative">
                  <input
                    type={showAdminCode ? 'text' : 'password'}
                    value={adminCode}
                    onChange={e => setAdminCode(e.target.value)}
                    placeholder="Secret Key"
                    className="w-full rounded-xl border border-textMain/10 bg-surface p-3 pr-11 text-sm text-textMain outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminCode(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-textMuted transition hover:bg-textMain/5 hover:text-textMain"
                    aria-label={showAdminCode ? 'Hide admin secret key' : 'Show admin secret key'}
                  >
                    {showAdminCode ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                  Verify Key
                </motion.button>
              </form>
            </motion.section>
          )}

          <motion.section variants={cardVariants} custom={3} className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warning/10 text-warning">
                <FiBell size={22} />
              </div>
              <div>
                <h2 className="font-bold text-textMain">Notifications</h2>
                <p className="text-sm text-textMuted">Choose the updates you want to receive.</p>
              </div>
            </div>
            <div className="space-y-3">
              <Toggle label="Email Alerts" />
              <Toggle label="Push Notifications" />
              <Toggle label="Task Updates" />
            </div>
          </motion.section>

          <motion.section variants={cardVariants} custom={4} className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FiMoon size={22} />
              </div>
              <div>
                <h2 className="font-bold text-textMain">Theme</h2>
                <p className="text-sm text-textMuted">Switch your workspace appearance.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'dark', label: 'Dark', icon: FiMoon },
                { id: 'light', label: 'Light', icon: FiSun },
              ].map((option) => (
                <motion.button
                  key={option.id}
                  type="button"
                  onClick={() => toggleTheme(option.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ${
                    theme === option.id
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border-textMain/10 bg-background/70 text-textMuted hover:border-primary/30 hover:text-textMain'
                  }`}
                >
                  <option.icon /> {option.label}
                </motion.button>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      <motion.section
        variants={cardVariants}
        custom={5}
        className="rounded-2xl border border-danger/25 bg-danger/5 p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-danger/10 text-danger">
              <FiAlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-danger">Danger Zone</h2>
              <p className="mt-1 text-sm leading-6 text-textMuted">
                Delete your account and remove your personal data permanently.
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleDeleteAccount}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-danger px-5 py-2.5 font-semibold text-white shadow-lg shadow-danger/20 transition hover:bg-danger/90"
          >
            <FiTrash2 /> Delete My Account
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Settings;
