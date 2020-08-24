import React, { useState, createContext, ReactNode, useContext, useEffect } from 'react'

import api from '../services/api'

type ToDoContextData = {
  todos: ToDo[];
  addTodo(todo: ToDo): void;
  changeTodo(todo: ToDo): void;
  removeTodo(todo: ToDo["id"]): void;
}

export interface ToDo {
  id: number
  concluido: number
  titulo: string
  descricao: string
}

interface Props {
  children: ReactNode;
}

const TodoContext = createContext<any>(void 0)

const TodoProvider: React.FC<Props> = (props: Props) => {
  const { children } = props

  const [todos, setTodos] = useState<ToDo[]>([])

  useEffect(() => {
    api.get("tarefas")
    .then((response) => {
      setTodos(response.data)
    }).catch((error) => {
      alert(error)
    })
  }, [])

  const addTodo = (todo: ToDo) => {
    const { id, concluido, titulo, descricao } = todo

    const newTodo = {
      id,
      concluido,
      titulo,
      descricao
    }
    setTodos([...todos, newTodo])
  }

  const changeTodo = (todo: ToDo) => {
    let currentTodos = todos;

    let foundIndex = currentTodos.findIndex(x => x.id === todo.id);

    currentTodos[foundIndex] = todo;

    setTodos(currentTodos)
  }

  const removeTodo = (todo: ToDo["id"]) => {
    let currentTodos = todos;

    const newPointer = currentTodos.filter(x => x.id !== todo);

    setTodos(newPointer)
  }

  return(
    <TodoContext.Provider value={{
      todos,
      addTodo,
      changeTodo,
      removeTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const context = useContext(TodoContext)
  const { todos, addTodo, changeTodo, removeTodo } = context
  return { todos, addTodo, changeTodo, removeTodo }
}

export default TodoProvider