import { Project } from '@/entities/Project';
import { CreateProjectDTO } from '../model';
import { generateId } from '@/shared/lib';

export function createProjectByDto(project: CreateProjectDTO) {
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    // columns: project.columns.map((column) => ({ ...column, id: 'column-' + generateId(), createdAt: new Date() })),
  };
  return newProject;
}
