import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDTO extends Document {
  @ApiProperty({ type: String, description: 'Nome de usuário' })
  nome: string;

  @ApiProperty({ type: String, description: 'Email de usuário' })
  email: string;

  @ApiProperty({ type: String, description: 'Senha de usuário' })
  senha: string;

  @ApiProperty({
    type: Array,
    description: '{ ddd: string, numero: string }',
  })
  telefones: Array<{
    ddd: string;
    numero: string;
  }>;

  token: string;

  ultimo_login: Date;
}

export class GetUserDTO {
  @ApiProperty({ type: String, description: 'Id de usuário' })
  _id: string;

  @ApiProperty({ type: String, description: 'Nome de usuário' })
  nome: string;

  @ApiProperty({ type: String, description: 'E-mail de usuário' })
  email: string;

  @ApiProperty({ type: String, description: 'Senha de usuário' })
  senha: string;

  @ApiProperty({
    type: Array,
    description: '{ ddd: string, numero: string }',
  })
  telefones: Array<string>;

  @ApiProperty({ type: String, description: 'Data de criação de usuário' })
  data_criacao: Date;

  @ApiProperty({ type: String, description: 'Data de atualização de usuário' })
  data_atualizacao: Date;

  @ApiProperty({ type: String, description: 'Último login de usuário' })
  ultimo_login: Date;

  @ApiProperty({ type: String, description: 'Token de usuário' })
  token: string;
}
