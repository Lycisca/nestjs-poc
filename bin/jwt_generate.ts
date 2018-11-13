import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService({ secretOrPrivateKey: 'secretKey' });
const token = jwt.sign({ user: 'user@mail.com' });

console.log(token);
