import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({ ...createTaskDto });
    return task.save();
  }

  async findAll(filter: any, sort: any): Promise<Task[]> {
    return this.taskModel.find(filter).sort(sort).exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id }, updateTaskDto, { new: true })
      .exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(id: string): Promise<any> {
    const task = await this.taskModel.findOneAndDelete({ _id: id }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
