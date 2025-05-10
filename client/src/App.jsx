import styles from './index.module.css'
import sqlLogo from './assets/sql.png'

import { useState } from 'react'

function App() {
  const [queryDescription, setQueryDescription] = useState('')
  const [sqlQuery, setSqlQuery] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const generatedQuery = await generateQuery()
    setSqlQuery(generatedQuery)
    console.log(generatedQuery)
  }

  const generateQuery = async() => {
    const response = await fetch("http://localhost:3005/generate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        queryDescription: queryDescription
      })
    })
    const data = await response.json()
    return data.sqlQuery.trim()
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlQuery)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <main className={styles.main}>
      <h1>queryGenie</h1>
      <h3>your que-viour is here</h3>

      <img src={sqlLogo} alt="sql logo" className={styles.icon}></img>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your query"
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        <input type="submit" value="Generate query"/>
        {sqlQuery && (
          <div style={{ position: 'relative' }}>
            <pre>{sqlQuery}</pre>
            <button 
              className={styles.copyButton}
              onClick={copyToClipboard}
              title="Copy to clipboard"
            >
              {copySuccess ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </form>
    </main>
  )
}

export default App
