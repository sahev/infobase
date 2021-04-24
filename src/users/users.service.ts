import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { Users } from './users.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async newUser(data: Users) {
    const encrypt = hashSync(data.senha, genSaltSync(10));
    const user = await this.usersModel.findOne({ email: data.email });
    data._id = v4();
    data.senha = encrypt;

    if (user) throw new BadRequestException('E-mail já existente');

    const payload = { _id: data._id, email: data.email };
    const token = this.jwtService.sign(payload);
    data.token = token;
    const newUser = new this.usersModel(data);

    return await newUser.save();
  }

  async getUserByEmail(email: any) {
    const user = await this.usersModel.findOne({ email });
    if (user) return user;

    throw new BadRequestException('Usuário inexistente');
  }

  async getUserByUserId(_id: any) {
    const user = await this.usersModel.findOne({ _id });
    console.log('user', user._id, _id);

    if (user) return user;
    throw new BadRequestException('Usuário inexistenteee');
  }

  async verifyLastAccess(_id: any) {
    const date = new Date();

    await this.usersModel.findOne({
      _id,
      ultimo_login: new Date(date.getTime() - 30 * 60000),
    });
  }
}
