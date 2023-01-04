import userController from './controllers/userController';
import authController from './controllers/authController';
import { validateToken } from './services/jwtValidate';
import express, { NextFunction, Request, response, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const app = express();
const port = 3000;

//express.jsonを読み込み
app.use(express.json());

//コントローラを読み込み
app.use('/user',userController);
app.use('/auth',authController);

app.get('/', async (req: Request, res: Response) => {
  res.json({message:"hello, world!"});
})


//express起動
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//JWT認証のテスト
app.get('/protected', validateToken, async (req: Request, res: Response) => {
  res.json({message:'protected contents.'});
})
