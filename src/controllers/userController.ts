import express, { Request, Response, Router} from 'express';
import { PrismaClient } from '@prisma/client';
import { validateToken } from '../services/jwtValidate';

const prisma = new PrismaClient();
const router = Router();

router.get('/all', validateToken, async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({result:users});
})


export default router