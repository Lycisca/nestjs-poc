import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService({ secretOrPrivateKey: 'secretKey' });
const token = jwt.sign({ email: 'user@mail.com' });

const payload: any = jwt.decode(token, { json: true });
console.log(token);
console.log(payload.email);
