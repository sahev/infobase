import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  _id: String,
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
  token: String,
});
