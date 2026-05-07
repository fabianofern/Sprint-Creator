export type UnitOfMeasure = 'hours' | 'story_points' | 'pf' | 't_shirt';
export type ProjectStatus = 'active' | 'archived' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type BacklogStatus = 'backlog' | 'planned' | 'in_progress' | 'done' | 'cancelled';
export type SprintStatus = 'planning' | 'active' | 'completed' | 'cancelled';
export type RiskLevel = 'low' | 'medium' | 'high';
export type ToolProfile = 'administrador' | 'operador' | 'visualizador';

export interface Company {
  id: string;
  name: string;
  externalPfId?: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  description?: string;
  unitOfMeasure: UnitOfMeasure;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  company?: Company;
}

export interface TeamMember {
  id: string;
  projectId: string;
  name: string;
  role: string;
  allocation: number;
  dailyHours: number;
  productivityFactor: number;
  isActive: boolean;
}

export interface BacklogItem {
  id: string;
  projectId: string;
  sprintId?: string;
  title: string;
  description?: string;
  size: number;
  status: BacklogStatus;
  priority: Priority;
  doneAt?: string;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
  capacityPlanned: number;
  capacityAdjustment: number;
  scopePlanned: number;
  scopeDelivered?: number;
  status: SprintStatus;
  isBaseline: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: any;
}
