import { Request, Response, NextFunction } from 'express';
import { createUnauthorizedResponse } from '../utils/responseUtils';
import { MESSAGES } from '../utils/globalMessage';

// Middleware untuk memeriksa peran pengguna
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Pastikan req.user sudah diatur oleh middleware otentikasi
    const userRoles = (req as any).user?.role || []; // Ambil peran dari req.user atau default ke array kosong

    if (roles.some(role => userRoles.includes(role))) {
      // Jika salah satu peran yang diperlukan ada di userRoles, izinkan akses
      next();
    } else {
      // Jika tidak ada peran yang sesuai, batalkan akses
      res.status(403).json(createUnauthorizedResponse(MESSAGES.ERROR.ACCESS_DENIED));
    }
  };
};
