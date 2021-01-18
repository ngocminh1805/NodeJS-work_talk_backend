import { ITaskRepository } from "../models/repositories/task-repository";
import { Task } from "../models/task";

export class TaskService {
  private taskRepo: ITaskRepository;
  constructor(taskRepository: ITaskRepository) {
    this.taskRepo = taskRepository;
  }

  async getAll(): Promise<Task[]> {
    console.log("Get all tasks");
    return await this.taskRepo.getAll();
  }

  async get(taskId: number): Promise<Task> {
    console.log("Get task by id ", taskId);
    return await this.taskRepo.get(taskId);
  }

  async create(task: Task): Promise<Task> {
    console.log("Create new task");
    return await this.taskRepo.create(task);
  }

  async update(taskId: number, task: Task): Promise<Task> {
    console.log("Update task");
    return await this.taskRepo.update(taskId, task);
  }

  async delete(taskId: number): Promise<Task> {
    console.log("Delete task with id ", taskId);
    return await this.taskRepo.delete(taskId);
  }
}
