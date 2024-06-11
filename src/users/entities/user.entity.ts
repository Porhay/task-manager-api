import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column()
  @ApiProperty({
    description: 'The name of user',
    example: 'user1',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: 'The password of user',
    example: '123123',
  })
  password: string;
}
