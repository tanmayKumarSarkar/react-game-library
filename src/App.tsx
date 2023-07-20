import { useState } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/Store'
import { Home } from './components/Home'
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home></Home>
      </BrowserRouter>
    </Provider>
  )
}

export default App
