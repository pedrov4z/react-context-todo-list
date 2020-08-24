import React from 'react'

import ToDoItem from '../../components/ToDoItem'

import Header from '../../components/Header'
import AddToDoForm from '../../components/AddToDoForm'

import { ToDo, useTodoContext } from '../../contexts/TodoContext'

import './styles.css'

export default function Home() {
  const { todos } = useTodoContext()

  return (
    <div id="home-page-container">
      <Header />

      {todos.map((todo: ToDo) => {
        return <ToDoItem key={todo.id} todo={todo} />
      })}

      <AddToDoForm />
    </div>
  )
}