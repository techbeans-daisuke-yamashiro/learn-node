import userController from './controllers/userController';
import authController from './controllers/authController';
import { validateToken } from './services/jwtValidate';
import express, { Request,  Response } from 'express';
const config = require('./config');
const app = express();

//express.jsonを読み込み
app.use(express.json());

//コントローラを読み込み
app.use('/user',userController);
app.use('/auth',authController);

app.get('/', async (req: Request, res: Response) => {
  res.json({message:"hello, world!"});
})


//express起動
app.listen(config.port, config.host, () => console.log(`Example app listening on port ${config.port}!`));

//JWT認証のテスト
app.get('/protected', validateToken, async (req: Request, res: Response) => {
  res.json({message:'protected contents.'});
})
