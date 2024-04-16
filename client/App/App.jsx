import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './AppBar'
import Pos from '../components/Pos'
import * as apis from '../apis/logIn'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App() {
  const [userDetails, setUserDetails] = React.useState(null)
  const [loginErr, setLoginErr] = React.useState(false)
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

  function handleLogin(event) {
    console.log(event)
    apis
      .getUserDetails(userIdRef.current, passwordRef.current)
      .then((res) => {
        if (res.error) {
          setLoginErr(true)
        } else {
          setUserDetails(res)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
                handleChange={handleChange}
                handleLogin={handleLogin}
                setUserDetails={setUserDetails}
                loginErr={loginErr}
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
