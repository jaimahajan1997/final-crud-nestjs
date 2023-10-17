import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
