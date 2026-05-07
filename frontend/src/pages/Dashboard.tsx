import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../hooks/useApi';
import type { Project } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuthStore } from '../stores/authStore';
import { Plus, Database } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentProject } = useAuthStore();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get('/projects');
      return res.data.data.items as Project[];
    },
  });

  const handleSelectProject = (projectId: string) => {
    setCurrentProject(projectId);
    navigate(`/projects/${projectId}/backlog`);
  };

  if (isLoading) return <div className="flex justify-center items-center h-full">Carregando projetos...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Meus Projetos</h1>
          <p className="text-slate-500">Selecione um projeto para gerenciar sprints e métricas</p>
        </div>
        <Button onClick={() => navigate('/projects/new')} className="flex items-center gap-2">
          <Plus size={20} /> Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            onClick={() => handleSelectProject(project.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <Badge variant={project.status === 'active' ? 'success' : 'default'}>
                {project.status}
              </Badge>
              <Database className="text-slate-300" size={24} />
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 mb-1">{project.name}</h2>
            <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">
              {project.description || 'Sem descrição definida.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 mt-auto">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase font-semibold">Unidade</p>
                <p className="text-sm font-medium text-slate-700">{project.unitOfMeasure}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase font-semibold">Empresa</p>
                <p className="text-sm font-medium text-slate-700">{project.company?.name || '-'}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {projects?.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
          <Database size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Nenhum projeto encontrado</h3>
          <p className="text-slate-400 mb-6">Comece criando seu primeiro projeto de simulação</p>
          <Button onClick={() => navigate('/projects/new')} variant="secondary">
            Criar Primeiro Projeto
          </Button>
        </div>
      )}
    </div>
  );
};
