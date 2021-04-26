import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { UsersDTO } from './users.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDTO>,
    private jwtService: JwtService,
  ) {}

  async newUser(data: UsersDTO) {
    const encryptedPass = this.encryptData(data.senha);
    const user = await this.usersModel.findOne({ email: data.email });
    data._id = v4();
    data.senha = encryptedPass;

    if (user) throw new BadRequestException('E-mail já existente');

    const payload = { _id: data._id, email: data.email };
    const token = this.jwtService.sign(payload);
    const encryptedToken = this.encryptData(token);

    data.token = encryptedToken;
    const newUser = new this.usersModel(data);

    return { token, user: await newUser.save() };
  }

  async getUserByEmail(email: any) {
    const user = await this.usersModel.findOne({ email });
    if (user) return user;
    throw new BadRequestException('Usuário inexistente');
  }

  async getUserByUserId(_id: any) {
    const user = await this.usersModel.findOne({ _id });
    if (user) return user;
    throw new BadRequestException('Usuário inexistente');
  }

  async validAccess(_id: any) {
    const r = await this.usersModel.findOne({
      _id,
    });

    if (!r) throw new BadRequestException('Usuário inexistente');

    const diff = this.getMinutesDiff(r.ultimo_login);
    if (diff > 30) return false;

    return true;
  }

  async setLastAccess(email: any) {
    return await this.usersModel.updateOne(
      { email },
      { ultimo_login: new Date() },
    );
  }

  getMinutesDiff(last: Date) {
    const lastacess = new Date(last).getTime();
    const now = new Date().getTime();
    return Math.floor((now - lastacess) / 1000 / 60);
  }

  encryptData(data: string) {
    return hashSync(data, genSaltSync(10));
  }
}
