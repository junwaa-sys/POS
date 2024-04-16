import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import NavBar from './AppBar'
import Pos from '../components/Pos'
import * as apis from '../apis/logIn'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import EditUser from '../components/users/EditUser'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null)
  const [loginErr, setLoginErr] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)
  const [cookie, setCookie] = useCookies('userId')
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
    apis
      .getUserDetails(userIdRef.current, passwordRef.current)
      .then((res) => {
        if (res.error) {
          setLoginErr(true)
        } else {
          setLoggedInUser(res)
          setCookie('userId', res.id)
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
                loggedInUser={loggedInUser}
                handleChange={handleChange}
                handleLogin={handleLogin}
                setLoggedInUser={setLoggedInUser}
                loginErr={loginErr}
                setUserDetails={setUserDetails}
              />
            }
          >
            <Route path="/pos" element={<Pos />} />
            <Route
              path="/users/edit"
              element={<EditUser userDetails={userDetails} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
