import "./App.css";
import { Button } from "@chakra-ui/react";
import { useSessionStorage } from "usehooks-ts";
import { useUploadModal } from "./hooks/useUploadModal";
import { TodoItem } from "./components/TodoItem";
import { useQuizModal } from "./hooks/useQuizModal";
import { AddButton } from "./components/AddButton";

function App() {
  const [todoList, setTodoList] = useSessionStorage("킹받두", []);
  const { open: openUploadModal } = useUploadModal();
  const { open: openQuizModal } = useQuizModal();

  return (
    <div className="layout">
      <section className="todo-list">
        <h1 className="title">킹받do</h1>
        <Button
          onClick={async () => {
            const qwe = await openQuizModal();
            console.log(qwe);
          }}
        >
          퀴즈풀기
        </Button>
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onToggle={(id) => {
              setTodoList(
                todoList.map((todo) => {
                  if (todo.id === id) {
                    return { ...todo, done: !todo.done };
                  }
                  return todo;
                }),
              );
            }}
            onRemove={(id) => {
              setTodoList(todoList.filter((todo) => todo.id !== id));
            }}
          />
        ))}
        <AddButton onClick={openUploadModal} />
      </section>
    </div>
  );
}

export default App;
