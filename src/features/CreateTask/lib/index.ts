import { Task } from '@/entities/Task';
import { CreateTaskDTO } from '../model';
import { generateId } from '@/shared/lib';

export function createTaskByDto(task: CreateTaskDTO) {
  const newProject: Task = {
    ...task,
    id: 'task-' + generateId(),
    createdAt: new Date(),
  };
  return newProject;
}
