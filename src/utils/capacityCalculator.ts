import { Decimal } from '@prisma/client/runtime/library';

export interface MemberCapacityInput {
  dailyHours: Decimal | number;
  allocation: Decimal | number;
  productivityFactor: Decimal | number;
}

export const calculateMemberDailyCapacity = (input: MemberCapacityInput): number => {
  const hours = Number(input.dailyHours);
  const alloc = Number(input.allocation);
  const prod = Number(input.productivityFactor);
  
  return hours * alloc * prod;
};

export const calculateMemberSprintCapacity = (
  input: MemberCapacityInput, 
  sprintDurationDays: number = 10
): number => {
  return calculateMemberDailyCapacity(input) * sprintDurationDays;
};

export const calculateTotalCapacity = (
  members: MemberCapacityInput[], 
  sprintDurationDays: number = 10
) => {
  const totalDaily = members.reduce(
    (sum, m) => sum + calculateMemberDailyCapacity(m), 
    0
  );
  
  return {
    totalDaily,
    totalSprint: totalDaily * sprintDurationDays,
    sprintDurationDays
  };
};
