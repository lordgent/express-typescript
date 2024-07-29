import prisma from '../utils/prismaClient';

export const createRole = async (roleName: string) => {
    const existingRole = await prisma.role.findUnique({
      where: { name: roleName },
    });
  
    if (existingRole) {
      throw new Error('Role already exists');
    }
  
    const newRole = await prisma.role.create({
      data: {
        name: roleName,
      },
    });
  
    return newRole;
  };

  export const findRoleByUserId = async (userId: string) => {
    const existingRole = await prisma.userRole.findMany({
      where: { userId:  userId},
    });

    return existingRole;
  };