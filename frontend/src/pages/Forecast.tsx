import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useApi';
import { Card } from '../components/ui/Card';
import { TrendingUp, Calendar, Target, CheckCircle2, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Forecast: React.FC = () => {
  const { projectId } = useParams();

  const { data: forecast, isLoading } = useQuery({
    queryKey: ['projects', projectId, 'forecast'],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/forecast`);
      return res.data.data;
    },
  });

  if (isLoading) return <div className="p-8 text-slate-500">Calculando previsões...</div>;

  const confidence = {
    value: 85,
    label: 'Alta',
    color: '#22c55e'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Forecast</h1>
        <p className="text-slate-500 mt-2 font-medium">Estimativas de conclusão baseadas em dados reais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Forecast Info */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Data Estimada</p>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                    <Calendar size={32} />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-800">
                      {forecast?.estimatedCompletionDate 
                        ? format(new Date(forecast.estimatedCompletionDate), "dd 'de' MMMM", { locale: ptBR })
                        : '---'}
                    </p>
                    <p className="text-sm font-bold text-primary uppercase">Próximo Marco: Q3 2024</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sprints Restantes</p>
                  <p className="text-2xl font-black text-slate-800">{Math.ceil(forecast?.estimatedSprintsRemaining || 0)}</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Velocity Média</p>
                  <p className="text-2xl font-black text-slate-800">{Number(forecast?.averageVelocity || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-inner">
              <div className="relative flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle 
                    className="text-slate-100" 
                    strokeWidth="12" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="80" cx="96" cy="96" 
                  />
                  <circle 
                    className="transition-all duration-1000 ease-out" 
                    strokeWidth="12" 
                    strokeDasharray={2 * Math.PI * 80} 
                    strokeDashoffset={2 * Math.PI * 80 * (1 - confidence.value / 100)} 
                    strokeLinecap="round" 
                    stroke={confidence.color} 
                    fill="transparent" 
                    r="80" cx="96" cy="96" 
                  />
                </svg>
                <div className="absolute text-center">
                  <p className="text-4xl font-black text-slate-800">{confidence.value}%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase">{confidence.label}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Análise de Risco */}
        <Card title="Análise de Prontidão" className="border-none shadow-sm">
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-slate-700">Estabilidade da Equipe</span>
                  <span className="text-sm text-emerald-600 font-bold">Excelente</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full">
                  <div className="bg-emerald-500 h-full w-[85%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Target size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-slate-700">Refinamento de Backlog</span>
                  <span className="text-sm text-blue-600 font-bold">Bom</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full">
                  <div className="bg-blue-500 h-full w-[70%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-slate-700">Previsibilidade de Entrega</span>
                  <span className="text-sm text-amber-600 font-bold">Moderada</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full">
                  <div className="bg-amber-500 h-full w-[45%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
