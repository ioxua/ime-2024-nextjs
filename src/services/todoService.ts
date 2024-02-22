'use server'

import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'fs/promises';

export type Todo = {
  id: string
  name: string
  done: boolean
}

// Just "subclass" this to create another implementation
abstract class TodoService {
  abstract add(name: string): Promise<Todo>
  abstract toggle(id: string, done?: boolean): Promise<Todo>
  abstract delete(id: string): Promise<boolean>
  abstract list(): Promise<Todo[]>
  abstract nextId(): Promise<string>
}

class ArrayTodoService extends TodoService {
  db: Record<string, Todo> = {
    'test-1': { id: 'test-1', done: false, name: 'Fazer as compras' },
    'test-2': { id: 'test-2', done: true, name: 'Jogar bingo' },
  }

  async nextId(): Promise<string> {
    return Promise.resolve(uuidv4())
  }
  async add(name: string): Promise<Todo> {
    const todo: Todo = {
      id: await this.nextId(),
      done: false,
      name,
    }
  
    // salvando no "banco"
    this.db[todo.id] = todo
    console.log('db post add', JSON.stringify(this.db))
    return todo
  }
  async toggle(id: string, done?: boolean): Promise<Todo> {
    const newDone = done ?? !this.db[id].done
    this.db[id].done = newDone
    console.log('db post toggle', JSON.stringify(this.db[id]))

    return this.db[id]
  }
  async delete(id: string): Promise<boolean> {
    if (!this.db[id]) return false
    delete this.db[id]
    console.log('db post delete', JSON.stringify(this.db))

    return true
  }
  async list(): Promise<Todo[]> {
    return Object.values(this.db)
  }
}

class FileTodoService extends TodoService {
  async openDb(): Promise<Record<string, Todo>> {
    let fileContent = await (await readFile(process.env.FILE_DB_PATH)).toString()
    if (!fileContent || fileContent === '') fileContent = '{}'

    const db: Record<string, Todo> = JSON.parse(fileContent)
    return db
  }

  async closeDb(newDb: Record<string, Todo>): Promise<boolean> {
    await writeFile(process.env.FILE_DB_PATH, JSON.stringify(newDb))
    return true
  }

  async nextId(): Promise<string> {
    return Promise.resolve(uuidv4())
  }
  async add(name: string): Promise<Todo> {
    const todo: Todo = {
      id: await this.nextId(),
      done: false,
      name,
    }

    const db = await this.openDb()
    db[todo.id] = todo
    console.log('db post add', JSON.stringify(db))
    
    // salvando no "banco"
    this.closeDb(db)
    return todo
  }
  async toggle(id: string, done?: boolean): Promise<Todo> {
    const db = await this.openDb()
    const newDone = done ?? !db[id].done
    db[id].done = newDone
    console.log('db post toggle', JSON.stringify(db[id]))

    this.closeDb(db)
    return db[id]
  }
  async delete(id: string): Promise<boolean> {
    const db = await this.openDb()
    if (!db[id]) return false
    delete db[id]
    console.log('db post delete', JSON.stringify(db))

    this.closeDb(db)
    return true
  }
  async list(): Promise<Todo[]> {
    const db = await this.openDb()
    return Object.values(db)
  }
}

const instance = new FileTodoService()

export default async function createInstance() {
  return instance
}