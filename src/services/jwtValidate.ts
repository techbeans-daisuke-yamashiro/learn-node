import {  Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const jwt = require('jsonwebtoken');
const jwtSecret = 'myapp';

const prisma = new PrismaClient();

const validateToken = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
      if (authHeader.split(" ")[0] === "Bearer") {
          try {
            const token = await jwt.verify(authHeader.split(" ")[1], jwtSecret);
            let usr = await prisma.user.findFirst({where:{id:token.id}});
            if (( usr !== null ) && (usr!.id == token.id)&&( Date.now() < token.exp * 1000)) {
                next();
            } else {
                res.status(401).json({ error: "auth error" })
            }
          } catch (e: any) {
              console.log(e.message);
              res.status(400).json({ error: e.message })
          }
      } else {
          res.status(400).json({ error: "header format error" });
      }
  } else {
      res.status(400).json({ error: "header error" });
  }
}

export{validateToken};