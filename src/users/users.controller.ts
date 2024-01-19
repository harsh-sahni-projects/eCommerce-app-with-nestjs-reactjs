import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.create(createUserDto, req, res);
  }
  
  @Post('login')
  login(@Body() creds: LoginDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.login(creds, req, res);
  }

  @Get('logout')
  logout() {
    return this.usersService.logout();
  }

  @Post('place-order')
  placeOrder(@Body() items: PlaceOrderDto[], @Req() req: Request, @Res() res: Response) {
    return this.usersService.placeOrder(items, req, res);
  }
}
