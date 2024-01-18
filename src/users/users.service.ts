import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { PlaceOrderDto } from 'src/books/dto/place-order.dto';
import { getNewToken } from '../common/token-manager';
import { Request, Response } from 'express';

const COOKIE_AGE = 60 * 60 * 1000; // ms

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async create(creds: CreateUserDto, req: Request, res: Response) {
    let { username, password, confirmPassword } = creds;
    username = username.trim();
    
    if (!username.length || !password.length)
      throw new HttpException('Invaild username or password', HttpStatus.BAD_REQUEST)
    
    if (password !== confirmPassword)
      throw new HttpException("Passwords don't match", HttpStatus.BAD_REQUEST);
    
    // USER EXISTS
    const alreadyPresentUser = await this.userModel.find({ username });
    
    if (alreadyPresentUser.length > 0) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    // CREATE USER
    const userDetails = {
      username,
      password,
      orders: []
    }
    await this.userModel.create(userDetails)

    // COOKIE
    const token = await getNewToken(username);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: COOKIE_AGE // ms
    });

    res.send({
      status: 200,
      message: 'User created',
      userDetails: {
        username,
        orders: []
      }
    })
  }

  async login(creds: LoginDto, req: Request, res: Response) {
    const usersArr = await this.userModel.find({username: creds.username});
    if (!usersArr.length) {
      throw new HttpException('Invalid username', HttpStatus.NOT_FOUND);
    }
    const { username, password, orders } = usersArr[0];
    if (creds.password !== password) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }

    const token = await getNewToken(username);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: COOKIE_AGE // ms
    });

    res.send({
      userDetails: {
        username,
        orders
      }
    })
  }

  logout() {
    return {
      status: 200,
      message: 'Loggout successfully'
    }
  }

  async placeOrder(items: PlaceOrderDto[]) {
    let amount = 0;
    items.forEach(item => {
      amount += item.quantity * item.unitPrice
    });
    const orderDetails = {
      items,
      amount,
      date: new Date()
    }
    // await this.userModel.updateOne({
    //   username
    // })
    console.log('Order placed with items:', items);
    return {
      status: 'Order placed',
      items
    }
  }

  // getUserDetails(username: string) {
  //   const index = this.allUsers.findIndex(user => user.username == username);
  //   if 
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
