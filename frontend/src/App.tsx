import { useEffect } from "react"
import { isAuthenticated } from "./auth/isAuthenticated"

const App = () => {
useEffect(() => {
  isAuthenticated();
}, [])

  return (
    <>
    </>
  )
}

export default App