import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../hooks/useApi';
import type { Sprint, Project } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Sprints: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}`);
      return res.data.data as Project;
    },
  });

  const { data: sprints, isLoading } = useQuery({
    queryKey: ['sprints', projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/sprints`);
      return res.data.data.items || res.data.data as Sprint[];
    },
  });

  if (isLoading) return <div>Carregando sprints...</div>;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'warning';
      case 'completed': return 'success';
      case 'planning': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sprints</h1>
          <p className="text-slate-500">Histórico e planejamento de sprints para {project?.name}</p>
        </div>
        <Button onClick={() => navigate(`/projects/${projectId}/sprints/new`)} className="flex items-center gap-2">
          Nova Sprint
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sprints?.map((sprint) => (
          <Card 
            key={sprint.id} 
            className="hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => navigate(`/sprints/${sprint.id}`)}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${sprint.status === 'active' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                  <Calendar size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{sprint.name}</h3>
                    {sprint.isBaseline && <Badge variant="info">Baseline</Badge>}
                    <Badge variant={getStatusVariant(sprint.status)}>{sprint.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Clock size={14} />
                    {format(new Date(sprint.startDate), "dd 'de' MMM", { locale: ptBR })} - {format(new Date(sprint.endDate), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Objetivo</p>
                  <p className="text-sm text-slate-600 max-w-xs truncate italic">
                    {sprint.goal || 'Nenhum objetivo definido'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Escopo</p>
                  <p className="text-sm font-bold text-slate-800">
                    {sprint.scopeDelivered || 0} / {sprint.scopePlanned} {project?.unitOfMeasure === 'hours' ? 'h' : 'pts'}
                  </p>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>
        ))}

        {sprints?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-600">Nenhuma sprint planejada</h3>
            <Button onClick={() => navigate(`/projects/${projectId}/sprints/new`)} variant="secondary" className="mt-4">
              Planejar Primeira Sprint
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
