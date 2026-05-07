import { PrismaClient } from '@prisma/client';
import { TeamMemberFilters } from '../types/index.js';
import { calculateMemberDailyCapacity } from '../utils/capacityCalculator.js';

const prisma = new PrismaClient();

export class TeamMemberService {
  async create(projectId: string, data: any) {
    return prisma.teamMember.create({
      data: {
        ...data,
        projectId,
      },
    });
  }

  async findAll(projectId: string, filters: TeamMemberFilters) {
    const { page = 1, limit = 10, search, isActive } = filters;
    const skip = (page - 1) * limit;

    const where: any = { projectId };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (isActive !== undefined) where.isActive = isActive;

    const [items, total] = await Promise.all([
      prisma.teamMember.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { name: 'asc' },
      }),
      prisma.teamMember.count({ where }),
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
    return prisma.teamMember.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return prisma.teamMember.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Requirements say hard delete or mark inactive. I'll do hard delete if requested by UI, 
    // but update can be used for inactive.
    return prisma.teamMember.delete({
      where: { id },
    });
  }

  async calculateIndividualCapacity(id: string) {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) throw new Error('Member not found');

    return {
      memberId: member.id,
      name: member.name,
      dailyCapacity: calculateMemberDailyCapacity(member),
      weeklyCapacity: calculateMemberDailyCapacity(member) * 5,
    };
  }
}

export const teamMemberService = new TeamMemberService();
