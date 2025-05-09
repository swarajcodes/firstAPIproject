import styles from './index.module.css'
import sqlLogo from './assets/sql.png'

import { useState } from 'react'

function App() {
  const [queryDescription, setQueryDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("form submitted: ",queryDescription)
  }
  return (
    
    <main className={styles.main}>
      
      <h1>queryGenie</h1>
      <h3>your que-viour is here</h3>

      <img src={sqlLogo} alt="sql logo" className='{styles.icon}'></img>


      <form onSubmit = {onSubmit}>
        <input
        type="text"
        name="query-description"
        placeholder="Describe your query"
        onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate query"/>
      </form>
    </main>
  )
}

export default App
