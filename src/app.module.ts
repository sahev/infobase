import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SigninModule } from './signin/signin.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:adqe1313@sahev.3ogy0.mongodb.net/infob?retryWrites=true&w=majority',
    ),
    SigninModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
