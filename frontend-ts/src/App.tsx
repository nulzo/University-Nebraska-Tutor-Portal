import "./style/output.css"
import { Button } from './components/ui/button'
import { Calendar } from "./components/ui/calendar"
import H1 from "./components/typography/H1"
import Navbar from "./components/navigation/Navbar"

function App() {
  return (
    <>
    <Navbar></Navbar>
    <H1 text="Hey!"/>
      <Button>Shadcn Button</Button>
      <Calendar></Calendar>
    </>
  )
}

export default App
