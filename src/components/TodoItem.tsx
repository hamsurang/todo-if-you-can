import { Button, Checkbox } from "@chakra-ui/react";
import {  TodoItemType } from "../constant";
interface TodoItemProps {
    todo: TodoItemType
    onToggle: (id: number) => void
    onRemove: (id: number) => void
    onUpdate: (id: number, text: string) => void
}

export const TodoItem = ({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) => {

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "space-between",
                    width:'100%',
                    maxWidth:'calc(100% - 130px)',
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
                <span
                    style={{
                        fontSize:'24px',
                        fontWeight: "bold",
                        zIndex:33,
                        marginLeft: "8px",
                        marginRight:"25px",                        
                        textDecoration: todo.done ? "line-through" : "none",
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                    }}
                >
                    {todo.text}
                </span>
            </div>
            <div style={{
                display: "flex",
                gap: "10px",
                width:"max-content"
            }}>
            <Button onClick={() => onUpdate(todo.id, todo.text)}>
                수정
            </Button>
            <Button
                onClick={() => onRemove(todo.id)}
            >
                삭제
            </Button>
            </div>
        </section>
    );
}