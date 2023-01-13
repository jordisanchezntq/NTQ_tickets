import { useState , useEffect } from 'react'
import Header from './components/Header/Header'
import Tasks from './components/Tasks/Tasks'

const LOCAL_STORAGE_KEY = 'todo:savedTasks'

function App() {
  const [tasks, setTasks] = useState([])

  const loadedSavedTasks = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(saved) {
      setTasks(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadedSavedTasks();

  }, [])
  

  const setTasksAndSave = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))  
  }

  function addTask(taskTitle) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false
      }
    ])
  }

  const toggleTaskCompletedById = (taskId) => {
    const newTasks = tasks.map( task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    })
    setTasksAndSave(newTasks)
  }

  const deleteTaskById = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks)
  }

  return (
    <>
      <Header onAddTask={addTask}/>
      <Tasks 
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  )
}

export default App
