import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:Nd1MKM0YXM2cdjW9@tm-cluster.kkfs3yn.mongodb.net/?retryWrites=true&w=majority&appName=tm-cluster',
    ),
  ],
})
export class DatabaseModule {}
