import { Button, Checkbox } from "@chakra-ui/react";
import {  TodoItemType } from "../constant";
interface TodoItemProps {
    todo: TodoItemType
    onToggle: (id: number) => void
    onRemove: (id: number) => void
    onUpdate: (id: number) => void
}

export const TodoItem = ({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) => {

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "space-between",
                }}
            >
                <Checkbox
                    size={"lg"}
                    type="checkbox"
                    style={{
                        zIndex:99
                    }}
                    isChecked={todo.done}
                    onChange={() => onToggle(todo.id)}
                />
                <div
                    style={{
                        fontSize:'24px',
                        fontWeight: "bold",
                        zIndex:33,
                        marginLeft: "8px",
                        marginRight:"25px",                        
                        textDecoration: todo.done ? "line-through" : "none",
                    }}
                >
                    {todo.text}
                </div>
            </div>
            <div style={{
                display: "flex",
                gap: "10px",
            }}>
            <Button onClick={() => onUpdate(todo.id)}>
                수정
            </Button>
            <Button
                onClick={() => onRemove(todo.id)}
            >
                삭제
            </Button>
            </div>
        </div>
    );
}