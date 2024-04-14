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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route path="/pos" element={<Pos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
