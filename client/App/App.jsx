import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './AppBar'
import Pos from '../components/Pos'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App() {
  const [userDetails, setUserDetails] = React.useState(null)
  const userIdRef = React.useRef('')
  const passwordRef = React.useRef('')

  function handleChange(event) {
    const value_type = event.target.id
    const value = event.target.value
    if (value_type === 'outlined-user-id') {
      userIdRef.current = value
    } else {
      passwordRef.current = value
    }
  }

  function handleLogin(loginDetails) {}

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NavBar
                userDetails={userDetails}
                loginDetails={loginDetails}
                handleChange={handleChange}
                handleLogin={handleLogin}
              />
            }
          >
            <Route path="/pos" element={<Pos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
