import { Document } from 'mongoose';

export class Users extends Document {
  nome: string;
  email: string;
  senha: string;
  telefones: Array<{
    ddd: string;
    numero: string;
  }>;
  token: string;
}
