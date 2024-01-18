import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/common/token-manager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.token;
    if (token == undefined) {
      throw new HttpException('Session expired', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decryptedToken = verifyToken(token);
      const { username } = decryptedToken;
      req['userDetails'] = {
        username
      }
    } catch (err) {
      console.log(err);
      if (err.message == 'jwt expired') {
        res.cookie('token', '', { expires: new Date(0) });
        return res.status(401).send({
          message: 'Session token expired',
          statusCode: 401
        });
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    next();
  }
}
