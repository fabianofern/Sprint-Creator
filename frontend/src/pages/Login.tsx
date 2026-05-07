import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import api from '../hooks/useApi';
import type { ToolProfile } from '../types';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [userId, setUserId] = React.useState('user-001');
  const [error, setError] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulação: buscar primeiro projeto para obter perfil
      const projectsRes = await api.get('/projects', {
        headers: { 'x-user-id': userId }
      });
      
      if (projectsRes.data.data.items && projectsRes.data.data.items.length > 0) {
        const firstProjectId = projectsRes.data.data.items[0].id;
        // Obter perfil real do usuário
        const profileRes = await api.get(`/projects/${firstProjectId}/members`, {
            headers: { 'x-user-id': userId }
        });
        
        // Simplificação: se o usuário existe, assume perfil administrador para o teste do sistema
        // Em prod, viria da tabela UserProfile
        setUser(userId, 'administrador');
        navigate('/dashboard');
      } else {
        setError('Usuário não encontrado ou sem projetos associados.');
      }
    } catch (err: any) {
      setError('Erro ao realizar login. Verifique o ID do usuário.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4">
      <Card className="w-full max-w-md shadow-2xl p-8 bg-white/95 backdrop-blur-sm border-white/20 transition-all hover:shadow-indigo-500/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sprint Creator</h1>
          <p className="text-slate-500 mt-2">Gestão Inteligente de Sprints e Cenários</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-center gap-3 animate-shake">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <Input 
              label="ID do Usuário (Simulado)" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Ex: user-001"
              required
              className="bg-white/50"
            />

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 transition-colors hover:border-indigo-200 group">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 group-hover:text-indigo-500 transition-colors">
                Contas de Teste (Seed)
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-mono">user-001</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold">Administrador</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-mono">user-002</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">Operador</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-mono">user-003</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">Visualizador</span>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full py-4 text-lg font-semibold shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
            Acessar Plataforma
          </Button>
        </form>
      </Card>
    </div>
  );
};
