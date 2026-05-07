import { PrismaClient, ProjectStatus } from '@prisma/client';
import { ProjectFilters } from '../types/index.js';
import { calculateTotalCapacity } from '../utils/capacityCalculator.js';

const prisma = new PrismaClient();

export class ProjectService {
  async create(data: any, createdBy: string) {
    return prisma.project.create({
      data: {
        ...data,
        createdBy,
      },
    });
  }

  async findAll(filters: ProjectFilters) {
    const { page = 1, limit = 10, search, companyId, status } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (companyId) where.companyId = companyId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { company: { select: { name: true } } },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        company: true,
        teamMembers: true,
        backlogItems: { take: 10 }, // Limit for performance
        sprints: { orderBy: { startDate: 'desc' }, take: 5 },
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.project.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Soft delete as requested
    return prisma.project.update({
      where: { id },
      data: { status: ProjectStatus.cancelled },
    });
  }

  async calculateCapacity(projectId: string, sprintDays: number = 10) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        teamMembers: {
          where: { isActive: true },
        },
      },
    });

    if (!project) throw new Error('Project not found');

    const capacity = calculateTotalCapacity(project.teamMembers, sprintDays);
    
    const details = project.teamMembers.map(m => ({
      memberId: m.id,
      memberName: m.name,
      dailyCapacity: Number(m.dailyHours) * Number(m.allocation) * Number(m.productivityFactor),
      sprintCapacity: Number(m.dailyHours) * Number(m.allocation) * Number(m.productivityFactor) * sprintDays,
    }));

    return {
      projectId: project.id,
      projectName: project.name,
      ...capacity,
      details,
    };
  }
}

export const projectService = new ProjectService();
