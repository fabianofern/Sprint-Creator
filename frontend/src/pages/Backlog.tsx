import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useApi';
import type { BacklogItem, Project } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import { Plus, Filter, GripVertical, ArrowUpRight } from 'lucide-react';

export const Backlog: React.FC = () => {
  const { projectId } = useParams();
  const { canEdit } = useAuthStore();

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}`);
      return res.data.data as Project;
    },
  });

  const { data: backlog, isLoading } = useQuery({
    queryKey: ['projects', projectId, 'backlog'],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/backlog`);
      return res.data.data.items as BacklogItem[];
    },
  });

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  if (isLoading) return <div>Carregando backlog...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Backlog do Projeto</h1>
          <p className="text-slate-500">Gerencie o escopo e as prioridades</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Filter size={18} /> Filtrar
          </Button>
          {canEdit() && (
            <Button className="flex items-center gap-2">
              <Plus size={18} /> Adicionar Item
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-10"></th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Prioridade</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tamanho</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {backlog?.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <GripVertical size={16} className="text-slate-300 group-hover:text-slate-400 cursor-grab" />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{item.description}</div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getPriorityVariant(item.priority)}>
                    {item.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                  {item.size} {project?.unitOfMeasure === 'hours' ? 'h' : 'pts'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'done' ? 'bg-green-500' : 
                      item.status === 'in_progress' ? 'bg-yellow-500' : 'bg-slate-300'
                    }`} />
                    <span className="text-sm text-slate-700 capitalize">{item.status.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {backlog?.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 italic">O backlog está vazio. Adicione itens para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};
