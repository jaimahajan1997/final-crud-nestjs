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
    // Use await to get the actual Todo object
    const todo = await this.todoRepository.findOne({ where: { id } });
    console.group(todo, dto);
    if (todo) {
      // Check that the record exists
      Object.assign(todo, dto);
      return this.todoRepository.save(todo);
    } else {
      // Handle the case where the Todo with the given id is not found
      throw new Error(`Todo with id ${id} not found`);
    }
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return await this.todoRepository.remove(todo);
  }
}
