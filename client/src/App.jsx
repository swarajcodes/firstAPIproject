import styles from './index.module.css'
import sqlLogo from './assets/sql.png'
import { useState } from 'react'
import { useTheme } from './ThemeContext'

function App() {
  const [queryDescription, setQueryDescription] = useState('')
  const [sqlQuery, setSqlQuery] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const { isDarkTheme, toggleTheme } = useTheme()

  const onSubmit = async (e) => {
    e.preventDefault()
    const generatedQuery = await generateQuery()
    setSqlQuery(generatedQuery)
    console.log(generatedQuery)
  }

  const generateQuery = async() => {

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3005'
    const response = await fetch(`${apiUrl}/generate`,{
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
    <main className={styles.main} data-theme={isDarkTheme ? 'dark' : 'light'}>
      <button 
        className={styles.themeToggle}
        onClick={toggleTheme}
        title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDarkTheme ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

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
