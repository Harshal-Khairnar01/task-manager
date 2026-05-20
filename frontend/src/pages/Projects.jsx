import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, deleteProject } from '../store/projectSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiFolder, FiPlus, FiTrash2, FiUsers } from 'react-icons/fi';

const projectAccents = [
  {
    bg: 'from-primary/20 via-primary/5 to-secondary/10',
    icon: 'from-primary to-secondary',
    ring: 'group-hover:border-primary/45 group-hover:shadow-primary/10',
  },
  {
    bg: 'from-secondary/20 via-secondary/5 to-success/10',
    icon: 'from-secondary to-success',
    ring: 'group-hover:border-secondary/45 group-hover:shadow-secondary/10',
  },
  {
    bg: 'from-warning/20 via-warning/5 to-primary/10',
    icon: 'from-warning to-primary',
    ring: 'group-hover:border-warning/45 group-hover:shadow-warning/10',
  },
  {
    bg: 'from-success/20 via-success/5 to-secondary/10',
    icon: 'from-success to-secondary',
    ring: 'group-hover:border-success/45 group-hover:shadow-success/10',
  },
];

const Projects = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { projects, isLoading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (token) dispatch(fetchProjects());
  }, [token, dispatch]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(createProject({ name, description }));
    if (createProject.fulfilled.match(resultAction)) {
      setShowModal(false);
      setName('');
      setDescription('');
    }
  };

  const openDeleteModal = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setProjectToDelete(project);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    setDeletingProjectId(projectToDelete._id);
    const resultAction = await dispatch(deleteProject(projectToDelete._id));
    if (deleteProject.fulfilled.match(resultAction)) {
      setProjectToDelete(null);
    }
    setDeletingProjectId(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold text-textMain">Projects</h1>
          <p className="text-sm text-textMuted">Manage your team projects and workspaces.</p>
        </div>
        {user?.role === 'Admin' && (
          <motion.button 
            onClick={() => setShowModal(true)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <FiPlus /> New Project
          </motion.button>
        )}
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-2xl bg-textMain/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4">
          {projects.map((p, i) => (
            (() => {
              const accent = projectAccents[i % projectAccents.length];
              const members = p.members || [];
              const visibleMembers = members.slice(0, 3);
              const extraMembers = Math.max(members.length - visibleMembers.length, 0);
              return (
            <motion.div 
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              key={p._id}
              className="relative group"
            >
              <Link to={`/projects/${p._id}`} className="block h-full">
                <div className={`relative h-full overflow-hidden rounded-2xl border border-textMain/10 bg-surface p-5 shadow-sm transition-all duration-300 group-hover:shadow-2xl ${accent.ring} flex flex-col`}>
                  <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${accent.bg}`} />
                  <div className="relative flex justify-between items-start mb-5">
                    <motion.div
                      animate={{ rotate: [0, 3, 0], scale: [1, 1.04, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, repeatDelay: i * 0.2 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.icon} flex items-center justify-center text-white shadow-lg`}
                    >
                      <FiFolder className="text-2xl" />
                    </motion.div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-textMain/10 bg-surface/80 px-2.5 py-1 text-[11px] font-semibold text-textMuted backdrop-blur">
                        Active
                      </span>
                      {user?.role === 'Admin' && (
                        <button 
                          onClick={(e) => openDeleteModal(e, p)}
                          className="p-2 text-textMuted hover:text-danger hover:bg-danger/10 rounded-xl transition-colors backdrop-blur"
                          title="Delete Project"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-textMain line-clamp-1 group-hover:text-primary transition-colors">{p.name}</h3>
                    <p className="text-sm text-textMuted leading-6 line-clamp-3">{p.description || 'No project description added yet.'}</p>
                  </div>
                  
                  <div className="relative mt-6 pt-4 border-t border-textMain/10 space-y-4">
                    <div className="flex items-center justify-between gap-3 text-sm text-textMuted">
                      <span className="flex items-center gap-1.5"><FiUsers /> {members.length} Members</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                        Open <FiArrowRight />
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex -space-x-2">
                        {visibleMembers.length > 0 ? visibleMembers.map((member, memberIndex) => (
                          <div
                            key={member._id || member.email || memberIndex}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-sm"
                            title={member.name || member.email || 'Member'}
                          >
                            {(member.name || member.email || 'M').charAt(0).toUpperCase()}
                          </div>
                        )) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-textMain/10 text-xs font-bold text-textMuted">
                            0
                          </div>
                        )}
                        {extraMembers > 0 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-background text-[11px] font-bold text-textMuted shadow-sm">
                            +{extraMembers}
                          </div>
                        )}
                      </div>
                      <div className="h-2 w-20 overflow-hidden rounded-full bg-textMain/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, Math.max(18, members.length * 18))}%` }}
                          transition={{ delay: i * 0.05 + 0.2, duration: 0.6 }}
                          className={`h-full rounded-full bg-gradient-to-r ${accent.icon}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
              );
            })()
          ))}
          
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-12 text-center glass rounded-2xl border-dashed"
            >
              <FiFolder className="text-4xl text-textMuted mx-auto mb-3" />
              <p className="text-textMuted">No projects found.</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-textMuted mb-1">Project Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface border border-textMain/10 rounded-lg p-3 text-textMain focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-textMuted mb-1">Description</label>
                <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-surface border border-textMain/10 rounded-lg p-3 text-textMain focus:outline-none focus:border-primary"></textarea>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-textMuted hover:bg-surface">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Create Project</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Project Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass w-full max-w-md p-6 rounded-2xl shadow-2xl border border-danger/20">
            <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
              <FiTrash2 size={22} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-textMain">Delete Project</h2>
            <p className="text-sm text-textMuted mb-6">
              Are you sure you want to delete <span className="font-semibold text-textMain">{projectToDelete.name}</span>? All associated tasks will also be removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                disabled={deletingProjectId === projectToDelete._id}
                className="px-4 py-2 rounded-lg text-textMuted hover:bg-surface disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                disabled={deletingProjectId === projectToDelete._id}
                className="px-4 py-2 rounded-lg bg-danger text-white hover:bg-danger/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {deletingProjectId === projectToDelete._id ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
