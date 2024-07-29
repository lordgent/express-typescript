import prisma from '../utils/prismaClient';
import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (email: string, name: string, password: string, phoneNumber?: string, roles: string[] = []) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      phoneNumber,
      roles: {
        create: roles.map(roleName => ({
          role: {
            connectOrCreate: {
              where: { name: roleName },
              create: { name: roleName },
            },
          },
        })),
      },
    },
    include: { roles: { include: { role: true } } },
  });

  return user;
};


export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ 
    where: { email },
    include: { roles: { 
      include: { 
      role: true
     } 
    } },
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ 
    where: { id: id },
    include: { roles: { 
      include: { 
      role: true
     } 
    } },
  });
};


