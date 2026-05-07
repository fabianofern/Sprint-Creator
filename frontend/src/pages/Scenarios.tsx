import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useApi';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Layers, Zap, AlertTriangle, PlayCircle } from 'lucide-react';

export const Scenarios: React.FC = () => {
  const { projectId } = useParams();

  const { data: scenarios, isLoading } = useQuery({
    queryKey: ['projects', projectId, 'scenarios'],
    queryFn: async () => {
      // Mock or real API
      return [
        { id: '1', name: 'Otimista', adjustedCapacity: 120, riskLevel: 'low', scopeCount: 15 },
        { id: '2', name: 'Realista', adjustedCapacity: 100, riskLevel: 'medium', scopeCount: 12 },
        { id: '3', name: 'Pessimista', adjustedCapacity: 80, riskLevel: 'high', scopeCount: 8 },
      ];
    },
  });

  if (isLoading) return <div>Carregando cenários...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Simulação de Cenários</h1>
          <p className="text-slate-500 mt-2 font-medium">Modele diferentes situações para planejar o futuro</p>
        </div>
        <Button className="rounded-2xl px-6 py-4 h-auto shadow-lg shadow-primary/20">
          Criar Novo Cenário
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {scenarios?.map((scenario) => (
          <Card key={scenario.id} className="border-none shadow-xl shadow-slate-200/50 p-8 rounded-3xl group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${
                scenario.riskLevel === 'low' ? 'bg-emerald-50 text-emerald-600' :
                scenario.riskLevel === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
              }`}>
                <Layers size={28} />
              </div>
              <Badge variant={scenario.riskLevel === 'low' ? 'success' : scenario.riskLevel === 'medium' ? 'warning' : 'danger'}>
                Risco {scenario.riskLevel}
              </Badge>
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2">{scenario.name}</h3>
            <p className="text-slate-500 text-sm font-medium mb-8">
              Capacidade ajustada para <span className="text-slate-900 font-bold">{scenario.adjustedCapacity}%</span> da média histórica.
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest">Escopo Estimado</span>
                <span className="font-black text-slate-800">{scenario.scopeCount} Itens</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-widest">Impacto de Prazo</span>
                <span className={scenario.riskLevel === 'low' ? 'text-emerald-600 font-black' : 'text-slate-800 font-black'}>
                  {scenario.riskLevel === 'low' ? '-2 Sprints' : scenario.riskLevel === 'medium' ? 'No Prazo' : '+3 Sprints'}
                </span>
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg shadow-slate-900/10">
              <PlayCircle size={18} />
              Rodar Simulação
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};
