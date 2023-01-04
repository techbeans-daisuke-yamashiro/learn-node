import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const prisma = new PrismaClient();
const saltRounds = 10;

function hashPassword(password: any) {
  let hashed = bcrypt.hashSync(password, saltRounds);
  return hashed;
}

//express起動
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.post('/auth',function (req, res){
  var username = req.body.user;
  var password = hashPassword(req.body.password);
  
})