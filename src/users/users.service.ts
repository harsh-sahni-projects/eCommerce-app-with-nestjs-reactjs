import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  private allUsers = [];
  create(creds: CreateUserDto) {
    let { username, password, confirmPassword } = creds;
    username = username.trim();
    
    if (!username.length || !password.length)
      throw new HttpException('Invaild username or password', HttpStatus.BAD_REQUEST)
    
    if (password !== confirmPassword)
      throw new HttpException("Passwords don't match", HttpStatus.BAD_REQUEST);
    
    // USER EXISTS
    // client = await getDbClient();
    // const db = client.db(DB_NAME);
    // const coll = db.collection(COLL_NAME);

    // const alreadyPresentUser = await coll.findOne({ username });
    // if (alreadyPresentUser) {
    //   return res.status(409).send('User with this username already present');
    // }

    // // ADD USER TO DB
    // const date = new Date();
    const userDetails = {
      username,
      password,
      orders: []
    }

    // const inserted = await coll.insertOne(userDetails);

    // if (!inserted) {
    //   return res.status(500).send('User not created');
    // }

    // LOGIN AFTER CREATING ACCOUNT
    // const token = await getNewToken(username);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 60 * 60 * 1000 // ms
    // });

    delete userDetails.password;
    return {
      status: 200,
      message: 'User created',
      userDetails
    }
  }

  login(creds: LoginDto) {
    return {
      userDetails: {
        username: creds.username,
        orders: []
      }
    }
  }

  logout() {
    return {
      status: 200,
      message: 'Loggout successfully'
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
