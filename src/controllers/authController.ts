import express, { Request,  Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import {  createToken } from '../utils/authUtils'
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const router = Router();

router.post('/login',async (req: Request, res: Response) => {
  var username = req.body.user;
  var password = req.body.password;
  try{
    const user = await prisma.user.findFirst({where:{name:req.body.user}});
    const match = await bcrypt.compare(req.body.password, user!.password);
    if (!match){
      return res.json({"message":"invalid password"});
    } else {
      return res.json({token: createToken(user)});
    }
    
  } catch(err){
    console.log(err);
  }
});

export default router
