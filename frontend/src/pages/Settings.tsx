import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../hooks/useApi';
import { Card } from '../components/ui/Card';
import { Settings as SettingsIcon, Shield, Bell, Database, HardDrive, Cpu } from 'lucide-react';

export const Settings: React.FC = () => {
  const { projectId } = useParams();

  const sections = [
    {
      title: 'Configurações Gerais',
      icon: Database,
      description: 'Nome do projeto, unidade de medida e prazos.',
      items: [
        { label: 'Unidade de Medida', value: 'Story Points' },
        { label: 'Duração Padrão da Sprint', value: '14 dias' },
        { label: 'Data de Início', value: '01/01/2024' }
      ]
    },
    {
      title: 'Segurança e Acessos',
      icon: Shield,
      description: 'Gerenciamento de permissões e perfis.',
      items: [
        { label: 'Perfil do Usuário', value: 'Administrador' },
        { label: 'Autenticação MFA', value: 'Ativado' }
      ]
    },
    {
      title: 'Notificações',
      icon: Bell,
      description: 'Alertas de atraso e capacidade.',
      items: [
        { label: 'Alertas de Backlog', value: 'Email' },
        { label: 'Resumo Semanal', value: 'Push' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="p-4 bg-slate-900 text-white rounded-3xl">
          <SettingsIcon size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Configurações</h1>
          <p className="text-slate-500 font-medium">Ajuste os parâmetros do sistema e projeto</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card key={section.title} className="border-none shadow-xl shadow-slate-200/50 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                    <section.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{section.title}</h3>
                    <p className="text-sm text-slate-500">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-t border-slate-50">
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                      <span className="text-sm font-bold text-slate-800">{item.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="text-sm font-bold text-primary hover:underline">
                    Editar seção
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {/* System Health Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-3">
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex items-center gap-8 shadow-2xl shadow-slate-900/20">
              <div className="p-5 bg-white/10 rounded-3xl">
                <HardDrive size={40} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Armazenamento de Dados</p>
                <p className="text-3xl font-black">1.2 GB / 5 GB</p>
                <div className="w-48 h-1.5 bg-white/10 rounded-full mt-4">
                   <div className="w-[24%] h-full bg-primary-light rounded-full" />
                </div>
              </div>
            </div>

            <div className="p-8 bg-primary rounded-[2.5rem] text-white flex items-center gap-8 shadow-2xl shadow-primary/20">
              <div className="p-5 bg-white/10 rounded-3xl">
                <Cpu size={40} />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-1">Performance da API</p>
                <p className="text-3xl font-black">Latência: 12ms</p>
                <p className="text-sm font-medium text-blue-100/70 mt-2">Status: Ultra Estável</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
