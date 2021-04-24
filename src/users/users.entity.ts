import * as mongoose from 'mongoose';
import { v4 } from 'uuid';

export const Users = new mongoose.Schema({
  _id: {
    type: String,
    default: v4(),
  },
  nome: String,
  email: String,
  senha: String,
  telefones: Array,
  data_criacao: {
    type: Date,
    default: new Date(),
  },
  data_atualizacao: {
    type: Date,
    default: null,
  },
  ultimo_login: {
    type: Date,
    default: new Date(),
  },
});
