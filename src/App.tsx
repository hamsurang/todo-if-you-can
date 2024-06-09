import "./App.css";
import { useToast } from "@chakra-ui/react";
import { useSessionStorage } from "usehooks-ts";
import { useUploadModal } from "./hooks/useUploadModal";
import { TodoItem } from "./components/TodoItem";
import { TodoItemType } from "./constant";
import { useState, useEffect } from "react";
import { useQuizModal } from "./hooks/useQuizModal";
import { AddButton } from "./components/AddButton";
import { useEditModal } from "./hooks/useEditModal";

function App() {
  const [todoList, setTodoList] = useSessionStorage<TodoItemType[]>(
    "킹받두",
    [],
  );
  const [clickCount, setClickCount] = useState(0);
  const { open: openUploadModal } = useUploadModal();
  const { open: openQuizModal } = useQuizModal();
  const [selectedTodoId, setSelectedTodoId] = useState<number | undefined>(
    undefined,
  );
  const toast = useToast();
  const [selectedText, setSelectedText] = useState<string>();
  const { open: openEditModal } = useEditModal({
    id: selectedTodoId ?? 0,
    text: selectedText ?? "",
  });

  useEffect(() => {
    const handleQuizModal = async () => {
      if (clickCount === 3) {
        setClickCount(0);
        const isCorrect = await openQuizModal();
        if (isCorrect) {
          setTodoList((prevTodoList) =>
            prevTodoList.map((todo) => {
              console.log(todo.id, selectedTodoId);
              if (todo.id === selectedTodoId) {
                return { ...todo, done: true };
              }
              return todo;
            }),
          );
        }
      }
      if(clickCount > 3) {
        setClickCount(0);
        setSelectedTodoId(undefined);
        setTodoList(todoList.map((todo) => ({ ...todo, done: false })));
      }
    };

    handleQuizModal();
  }, [clickCount, openQuizModal, selectedTodoId, setTodoList, todoList]);

  return (
    <div className="layout">
      <section className="todo-list">
        <img
          className="background-img"
          src="/images/킹받쥬.png"
          alt="킹받do"
          width={100}
        />
        <h1 className="title">킹받do</h1>
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onToggle={async (id) => {
              if (clickCount < 3) {
                toast({
                  title: "어?! 어라라... 3번 누르면 될까?",
                });
              }
              setClickCount((prev) => prev + 1);
              setSelectedTodoId(id);
            }}
            onUpdate={async () => {
              await setSelectedTodoId(todo.id);
              await setSelectedText(todo.text);
              openEditModal();
            }}
            onRemove={(id) => {
              setClickCount(0);
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
