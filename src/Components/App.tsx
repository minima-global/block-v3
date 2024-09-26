import { useEffect } from 'react'

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'false') {
      document.body.classList.remove('dark')
      document.body.classList.add('bg-white', 'transition-colors')
    } else {
      document.body.classList.add(
        'dark',
        'dark:bg-background',
        'transition-colors'
      )
    }
  }, [])

  return <div>{children}</div>
}

export default App
