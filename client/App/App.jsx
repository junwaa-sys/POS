import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies, Cookies } from 'react-cookie'
import NavBar from './AppBar'
import Pos from '../components/Pos'
import * as apis from '../apis/logIn'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import EditUser from '../components/users/EditUser'
import Users from '../components/users/Users'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null)
  const [loginErr, setLoginErr] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)
  const [isNew, setIsNew] = React.useState(false)
  const [newId, setNewId] = React.useState('')
  const [cookie, setCookie] = useCookies('loggedInUser')
  const userIdRef = React.useRef('')
  const passwordRef = React.useRef('')

  const cookies = new Cookies()

  React.useEffect(() => {
    setLoggedInUser(cookies.get('loggedInUser'))
  }, [])

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
          setCookie('loggedInUser', res)
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
              path="/users-edit"
              element={
                <EditUser
                  userDetails={userDetails}
                  isNew={isNew}
                  newId={newId}
                />
              }
            />
            <Route
              path="/users"
              element={
                <Users
                  setUserDetails={setUserDetails}
                  setIsNew={setIsNew}
                  setNewId={setNewId}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
