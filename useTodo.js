import { useEffect, useReducer } from "react";
import { todoReducer } from "../components/useReducer/todoReducer";

const initialState = [];

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}
export const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const handleTodo = ({ action, value }) => {
        let payload;
        switch (action) {
            case '[TODO] Add Todo':
                if (value.length < 1) return;
                payload = {
                    id: new Date().getTime(),
                    description: value,
                    done: false,
                };
                break;
            case '[TODO] Remove Todo':
            case '[TODO] Toggle Todo':
                payload = Number(value);
                break;
        }

        const newAction = {
            type: action,
            payload
        };

        dispatch(newAction);
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleTodo,
    }
}
