import {  TodoItemType } from "../constant";


interface TodoItemProps {
    todo: TodoItemType
    onToggle: (id: number) => void
    onRemove: (id: number) => void
}

export const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo.id)}
                />
                <div
                    style={{
                        marginLeft: "8px",
                        textDecoration: todo.done ? "line-through" : "none",
                    }}
                >
                    {todo.text}
                </div>
            </div>
            <button
                onClick={() => onRemove(todo.id)}
            >
                삭제
            </button>
        </div>
    );
}