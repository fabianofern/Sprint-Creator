import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Users, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentProjectId } = useAuthStore();
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Projetos', icon: Database, path: '/projects' },
  ];

  const projectItems = currentProjectId ? [
    { label: 'Backlog', icon: Layers, path: `/projects/${currentProjectId}/backlog` },
    { label: 'Sprints', icon: Database, path: `/projects/${currentProjectId}/sprints` },
    { label: 'Equipe', icon: Users, path: `/projects/${currentProjectId}/team` },
    { label: 'Métricas', icon: BarChart3, path: `/projects/${currentProjectId}/metrics` },
    { label: 'Cenários', icon: Layers, path: `/projects/${currentProjectId}/scenarios` },
    { label: 'Forecast', icon: BarChart3, path: `/projects/${currentProjectId}/forecast` },
    { label: 'Configurações', icon: Settings, path: `/projects/${currentProjectId}/settings` },
  ] : [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          {!collapsed && <span className="font-bold text-xl text-white">Sprint Creator</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-slate-800 rounded">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 font-bold' 
                  : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-medium'
                }
              `}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}

          {projectItems.length > 0 && (
            <>
              <div className="pt-6 pb-2 text-[10px] font-black uppercase text-slate-500 px-3 tracking-widest">
                {!collapsed && 'Projeto Atual'}
              </div>
              {projectItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-primary/20 text-primary-light border border-primary/30 font-bold' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent font-medium'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};
