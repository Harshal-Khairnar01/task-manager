import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, fetchDashboardStats } from '../store/projectSlice';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFolder,
  FiUsers,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.38, ease: 'easeOut' },
  }),
};

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { projects, stats, isLoading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchProjects());
      dispatch(fetchDashboardStats());
    }
  }, [token, dispatch]);

  const firstName = user?.name?.split(' ')[0] || 'there';
  const totalProjects = stats?.totalProjects || projects.length || 0;
  const completed = stats?.tasksCompleted || 0;
  const inProgress = stats?.tasksInProgress || 0;
  const overdue = stats?.tasksOverdue || 0;
  const trackedTasks = completed + inProgress + overdue;
  const completionRate = trackedTasks ? Math.round((completed / trackedTasks) * 100) : 0;
  const activeProjects = projects.filter((project) => (project.members?.length || 0) > 0).length;
  const totalMembers = projects.reduce((sum, project) => sum + (project.members?.length || 0), 0);
  const avgMembers = projects.length ? Math.round(totalMembers / projects.length) : 0;
  const recentProjects = [...projects].slice(0, 4);

  const statsCards = [
    {
      title: 'Projects',
      value: totalProjects,
      helper: activeProjects ? `${activeProjects} with active members` : 'Create a workspace to begin',
      icon: FiFolder,
      tone: 'from-primary/18 to-primary/5 text-primary',
    },
    {
      title: 'Completed',
      value: completed,
      helper: `${completionRate}% completion rate`,
      icon: FiCheckCircle,
      tone: 'from-success/18 to-success/5 text-success',
    },
    {
      title: 'In Progress',
      value: inProgress,
      helper: inProgress ? 'Work currently moving' : 'No active task flow yet',
      icon: FiClock,
      tone: 'from-warning/18 to-warning/5 text-warning',
    },
    {
      title: 'Overdue',
      value: overdue,
      helper: overdue ? 'Needs priority review' : 'No overdue tasks',
      icon: FiAlertCircle,
      tone: 'from-danger/18 to-danger/5 text-danger',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="space-y-6 md:space-y-8"
    >
      <motion.section
        variants={cardVariants}
        className="relative overflow-hidden rounded-2xl border border-textMain/10 bg-surface shadow-sm"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.16),transparent_32%)]" />
        <div className="relative p-5 sm:p-6 lg:p-8">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.32 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              <FiActivity />
              Live workspace overview
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              className="max-w-3xl text-2xl font-bold leading-tight text-textMain sm:text-3xl lg:text-4xl"
            >
              {totalProjects === 0 ? `Welcome to Worksphere, ${firstName}` : `Welcome back, ${firstName}`}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              className="mt-3 max-w-2xl text-sm leading-6 text-textMuted sm:text-base"
            >
              {totalProjects === 0
                ? 'Create your first project, invite your team, and start tracking task progress from one dashboard.'
                : 'Track project momentum, task health, and team activity without jumping between boards.'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                >
                  Open Projects <FiArrowRight />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                to="/team"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-textMain/10 bg-surface/70 px-4 py-2.5 text-sm font-semibold text-textMain transition hover:border-primary/30 hover:text-primary"
                >
                  View Team <FiUsers />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            custom={i}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-textMuted">{stat.title}</p>
                <p className="mt-3 text-3xl font-bold text-textMain">{stat.value}</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 4, 0], scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: i * 0.35 }}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone}`}
              >
                <stat.icon size={21} />
              </motion.div>
            </div>
            <p className="mt-4 text-sm text-textMuted">{stat.helper}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <motion.div variants={cardVariants} custom={1} className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-textMain">Recent Projects</h2>
              <p className="text-sm text-textMuted">Jump back into the workspaces your team is using.</p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              View all <FiArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-36 animate-pulse rounded-2xl bg-textMain/5" />
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-textMain/15 bg-background/60 p-8 text-center">
              <FiFolder className="mx-auto mb-3 text-4xl text-textMuted" />
              <h3 className="font-semibold text-textMain">No projects yet</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-textMuted">
                Create a project to unlock team boards, task tracking, progress charts, and member activity.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recentProjects.map((project, i) => (
                <motion.div
                  key={project._id}
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Link to={`/projects/${project._id}`} className="group block h-full">
                    <div className="flex h-full flex-col rounded-2xl border border-textMain/10 bg-background/60 p-5 transition group-hover:border-primary/40 group-hover:bg-primary/5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <FiFolder size={22} />
                        </div>
                        <span className="rounded-full bg-textMain/5 px-2.5 py-1 text-xs font-semibold text-textMuted">
                          {project.members?.length || 0} members
                        </span>
                      </div>
                      <h3 className="mt-4 line-clamp-1 text-lg font-bold text-textMain group-hover:text-primary">{project.name}</h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-textMuted">
                        {project.description || 'No description added yet.'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.aside
          variants={cardVariants}
          custom={2}
          whileHover={{ y: -4 }}
        >
          <div className="rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-textMain">Team Snapshot</h2>
                <p className="text-sm text-textMuted">Capacity across projects.</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <FiUsers size={22} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.35 }}
                className="rounded-xl bg-background/70 p-4"
              >
                <p className="text-2xl font-bold text-textMain">{totalMembers}</p>
                <p className="text-xs font-medium text-textMuted">Project seats</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.35 }}
                className="rounded-xl bg-background/70 p-4"
              >
                <p className="text-2xl font-bold text-textMain">{avgMembers}</p>
                <p className="text-xs font-medium text-textMuted">Avg. members</p>
              </motion.div>
            </div>
          </div>
        </motion.aside>
      </section>
    </motion.div>
  );
};

export default Dashboard;
