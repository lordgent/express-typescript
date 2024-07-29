import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET as string; 
const expiresIn = '1h'; 

interface Payload {
  userId: string;
  role: string[];
}

export const generateToken = (userId: string, roles: string[]): string => {
  const payload: Payload = {
    userId,
    role: roles,
  };

  return jwt.sign(payload, secretKey, { expiresIn });
};
