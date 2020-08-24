import React from 'react'

import Logo from '../../assets/images/logo.png'

import './styles.css'

export default function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo To-Do List" />
      <h1>To-Do List</h1>
    </header>
  )
}