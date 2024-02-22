"use server"

import createTodos from "@/services/todoService";

export async function createTodo(formData: FormData) {
  const todoService = await createTodos()

  const name = formData.get("todo-name")!
  console.log('criando todo com texto=', name)

  await todoService.add(name.toString())
}

export async function toggleTodo(id: string) {
  const todoService = await createTodos();

  console.log("toggling id=", id);

  await todoService.toggle(id);
}

export async function deleteTodo(id: string) {
  const todoService = await createTodos();

  console.log("deleting id=", id);

  await todoService.delete(id);
}
