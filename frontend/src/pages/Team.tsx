import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../hooks/useApi';
import type { TeamMember } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Users, UserPlus, Mail, Shield, Zap } from 'lucide-react';

export const Team: React.FC = () => {
  const { projectId } = useParams();

  const { data: members, isLoading } = useQuery({
    queryKey: ['projects', projectId, 'team'],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/members`);
      return res.data.data.items as TeamMember[];
    },
  });

  if (isLoading) return <div className="p-8 text-slate-500 animate-pulse">Carregando equipe...</div>;

  const membersList = Array.isArray(members) ? members : [];
  
  const totalCapacity = membersList.reduce((acc, m) => 
    acc + (Number(m.dailyHours) * Number(m.allocation)), 0
  );
  
  const avgProductivity = membersList.length > 0 
    ? membersList.reduce((acc, m) => acc + Number(m.productivityFactor), 0) / membersList.length 
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Equipe do Projeto</h1>
          <p className="text-slate-500 mt-2 font-medium">Gerencie a capacidade e produtividade do seu time</p>
        </div>
        <Button className="rounded-2xl px-6 py-6 h-auto shadow-xl shadow-primary/20 flex items-center gap-2">
          <UserPlus size={20} />
          Adicionar Membro
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4">
            <Users size={24} />
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total de Membros</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{membersList.length}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit mb-4">
            <Zap size={24} />
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Capacidade Total</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{totalCapacity.toFixed(1)}h/dia</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl w-fit mb-4">
            <Shield size={24} />
          </div>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Produtividade Média</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{avgProductivity.toFixed(2)}x</p>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membersList.map((member) => (
          <div key={member.id} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Users size={28} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{member.name}</h3>
                <p className="text-slate-500 text-sm font-medium">{member.role}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-tighter">Alocação</span>
                <span className="font-bold text-slate-700">{(Number(member.allocation) * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500" 
                  style={{ width: `${Number(member.allocation) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-400 font-bold uppercase tracking-tighter">Horas Diárias</span>
                <span className="font-bold text-slate-700">{Number(member.dailyHours)}h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold uppercase tracking-tighter">Fator Prod.</span>
                <span className="font-bold text-emerald-600">{Number(member.productivityFactor).toFixed(2)}x</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors">
              Ver Perfil Completo
            </button>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <button className="border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary hover:text-primary transition-all duration-300 group">
          <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-primary/10">
            <UserPlus size={32} />
          </div>
          <span className="font-bold">Adicionar novo membro</span>
        </button>
      </div>
    </div>
  );
};
