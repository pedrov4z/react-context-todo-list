import React, { useState, useEffect, useRef } from 'react'

import { BiPencil, BiTrash, BiUpload } from 'react-icons/bi'
import { HiOutlineExclamation } from 'react-icons/hi'

import Checkbox from '../Checkbox'

import { ToDo, useTodoContext } from '../../contexts/TodoContext'

import api from '../../services/api'

import './styles.css'

interface ToDoItemProps {
  todo: ToDo
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {
  const [titulo, setTitulo] = useState(todo.titulo)
  const [descricao, setDescricao] = useState(todo.descricao)
  const [concluido, setConcluido] = useState(todo.concluido)
  const [editMode, setEditMode] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const didMountRef = useRef(false);

  const { changeTodo, removeTodo } = useTodoContext()

  useEffect(() => {
    if (didMountRef.current)
      sendUpdatedToDo();
    else
      didMountRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concluido]);

  async function handleCheckboxChange() {
    concluido === 1 ? setConcluido(0) : setConcluido(1)
  }

  function handleEditMode() {
    setEditMode(!editMode)
  }
  
  function handleDeleteConfirmation() {
    setDeleteConfirmation(!deleteConfirmation)
  }

  async function sendUpdatedToDo() {
    await api
      .put(`tarefas/${todo.id}`, {
        titulo,
        descricao,
        concluido,
      })
      .then(() => {
        changeTodo({ id: todo.id, concluido, titulo, descricao })
        setEditMode(false)
      })
      .catch((error) => {
        alert(error)
      })
  }

  async function sendToDoDeletion() {
    await api
      .delete(`tarefas/${todo.id}`)
      .then(() => {
        removeTodo(todo.id)
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div className="item-container">
      <label>
        <Checkbox checked={concluido === 1 ? true : false} onChange={handleCheckboxChange} />
      </label>

      <div className="item-text">
        {editMode ? (
          <>
            <input
              className="titulo"
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
              className="descricao"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => {
                setDescricao(e.target.value)
              }}
            />
          </>
        ) : (
          <>
            <h2 className="titulo">{titulo}</h2>
            <p className="descricao">{descricao}</p>
          </>
        )}
      </div>

      <div className="item-crud">
        <div
          onClick={editMode ? sendUpdatedToDo : handleEditMode}
          className="crud-update"
        >
          {editMode ? (
            <BiUpload size={22} color="#FFF" />
          ) : (
            <BiPencil size={22} color="#FFF" />
          )}
        </div>

        <div
          onClick={
            deleteConfirmation ? sendToDoDeletion : handleDeleteConfirmation
          }
          className="crud-delete"
        >
          {deleteConfirmation ? (
            <HiOutlineExclamation size={22} color="#FFF" />
          ) : (
            <BiTrash size={22} color="#FFF" />
          )}
        </div>
      </div>
    </div>
  )
}

export default ToDoItem
