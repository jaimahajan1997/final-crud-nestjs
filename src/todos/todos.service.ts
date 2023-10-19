import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}
  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  find(options) {
    return this.todoRepository.find(options);
  }

  async update(id: number, dto: CreateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    console.group(todo, dto);
    if (todo) {
      Object.assign(todo, dto);
      return this.todoRepository.save(todo);
    } else {
      throw new Error(`Todo with id ${id} not found`);
    }
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return await this.todoRepository.remove(todo);
  }
}
