import React, { useState } from 'react'

import { BiListPlus } from 'react-icons/bi'

import api from '../../services/api'

import { useTodoContext } from '../../contexts/TodoContext'

import './styles.css'

const AddToDoForm: React.FC = () => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const { addTodo } = useTodoContext()

  async function sendNewToDo() {
    (titulo.length !== 0 && descricao.length !== 0) ? (
      await api.post('tarefas', {
        titulo,
        descricao,
        concluido: 0,
      }).then((response) => {
        addTodo(response.data)
      }).catch((error) => {
        alert(error)
      })
    ) : (
      alert("Campo vazio")
    )
  }

  return (
    <form>
      <div className="form-card">
        <div className="input-list">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value)
            }}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value)
            }}
          />
        </div>

        <div onClick={sendNewToDo} className="crud-create">
          <BiListPlus size={50} color="#FFF" />
        </div>
      </div>
    </form>
  )
}

export default AddToDoForm
