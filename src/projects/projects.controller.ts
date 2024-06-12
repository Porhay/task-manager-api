import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccessUserGuard } from 'src/auth/guards/access-user.guard';

@ApiTags('Projects')
@Controller('users/:userId/projects')
@UseGuards(JwtAuthGuard, AccessUserGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Param('userId') userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAllByUserId(@Param('userId') userId: string) {
    return this.projectsService.findAllByUserId(userId);
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectsService.findOne(projectId);
  }

  @Patch(':projectId')
  @UsePipes(new ValidationPipe())
  update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  remove(@Param('projectId') projectId: string) {
    return this.projectsService.remove(projectId);
  }
}
