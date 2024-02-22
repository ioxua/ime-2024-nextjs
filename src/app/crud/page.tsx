import createTodos from "@/services/todoService";
import SearchBar from "./SearchBar";
import TodoComponent from "./Todo";


export default async function CrudPage() {
  const todoService = await createTodos()
  const todos = await todoService.list()

  return (
    <section className="max-w-96 mx-auto mt-8">
      <SearchBar />
      <div className="todos">
        {todos.map(todo => (
          <TodoComponent key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}
