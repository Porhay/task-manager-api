import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export enum TaskStatus {
  New = 'new',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsString()
  @IsNotEmpty()
  projectId: string;
}
