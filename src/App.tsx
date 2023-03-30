import { useState } from 'react'
import { Form, Header, Hero, Users } from './components'

function App() {
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Users isRegisterSuccess={isRegisterSuccess} />
        <Form isRegisterSuccess={isRegisterSuccess} setIsRegisterSuccess={setIsRegisterSuccess}/>
      </main>
    </>
  )
}

export default App
