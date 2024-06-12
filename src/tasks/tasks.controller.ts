import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccessUserGuard } from '../auth/guards/access-user.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('users/:userId/projects/:projectId/tasks')
@UseGuards(JwtAuthGuard, AccessUserGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.create({ userId, ...createTaskDto });
  }

  @Get()
  async findAll(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
    @Query('status') status: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: string,
    @Query('createdAt') createdAt: Date,
  ): Promise<Task[]> {
    const filter = {
      userId,
      projectId,
      ...(status && { status }),
      ...(createdAt && { createdAt: { $gte: new Date(createdAt) } }),
    };
    const sort = sortBy ? { [sortBy]: order === 'desc' ? -1 : 1 } : {};
    return this.tasksService.findAll(filter, sort);
  }

  @Get(':taskId')
  async findOne(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async remove(@Param('taskId') taskId: string): Promise<any> {
    return this.tasksService.remove(taskId);
  }
}
