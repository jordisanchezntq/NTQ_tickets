import styles from './header.module.css'
import Logo from '../../assets/logo-nicequest-color-white.svg'
import {AiOutlinePlus} from 'react-icons/ai'
import { useState } from 'react'

function Header({onAddTask}) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title);
    setTitle('')
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  return (
    <header className={styles.header}>
        <img src={Logo} alt="logo image" />

        <form 
        onSubmit={handleSubmit}
        className={styles.newTaskForm}
        >
          <input 
          type="text"
          placeholder='Add a new task'
          value={title}
          onChange={onChangeTitle}
          />
          <button>Create <AiOutlinePlus size={22}/></button>
        </form>
    </header>
  )
}

export default Header