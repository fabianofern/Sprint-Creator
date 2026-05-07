import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useApi';
import { Card } from '../components/ui/Card';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const Metrics: React.FC = () => {
  const { projectId } = useParams();

  const { data: burnup } = useQuery({
    queryKey: ['projects', projectId, 'burnup'],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/forecast/burnup`);
      return res.data.data;
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Métricas de Performance</h1>
        <p className="text-slate-500 mt-2 font-medium">Acompanhamento evolutivo do projeto</p>
      </div>

      <Card title="Gráfico de Burnup (Ideal vs Real)" className="border-none shadow-xl shadow-slate-200/50 p-8 rounded-3xl">
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={burnup}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="sprintName" axisLine={false} tickLine={false} dy={10} />
              <YAxis axisLine={false} tickLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={48}/>
              <Area 
                type="monotone" 
                dataKey="totalScope" 
                name="Escopo Total" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="delivered" 
                name="Entregue" 
                stroke="#22c55e" 
                fillOpacity={1} 
                fill="url(#colorDelivered)" 
                strokeWidth={4}
              />
              <Area 
                type="monotone" 
                dataKey="planned" 
                name="Planejado" 
                stroke="#eab308" 
                fill="transparent" 
                strokeDasharray="8 8"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Eficiência de Entrega" className="border-none shadow-sm p-8 rounded-3xl">
          <div className="flex items-center justify-center h-48">
             <div className="text-center">
                <p className="text-5xl font-black text-primary">92%</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-xs">Say/Do Ratio</p>
             </div>
          </div>
        </Card>
        
        <Card title="Qualidade Técnica" className="border-none shadow-sm p-8 rounded-3xl">
          <div className="flex items-center justify-center h-48">
             <div className="text-center">
                <p className="text-5xl font-black text-emerald-500">A+</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest mt-2 text-xs">Health Score</p>
             </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
