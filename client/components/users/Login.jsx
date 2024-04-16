import * as React from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Stack from '@mui/material/Stack'
import { TextField, Typography } from '@mui/material'
import { Cookies } from 'react-cookie'

function Login({ handleChange, handleLogin, loginErr }) {
  const [showPassword, setShowPassword] = React.useState(false)
  const cookies = new Cookies()
  console.log(cookies.get('userId'))
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <Box
        display="flex"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Stack spacing={2}>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                required
                error={loginErr}
                id="outlined-user-id"
                type={'text'}
                label="USER ID"
                autoFocus={true}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <TextField
                required
                label="PASSWORD"
                error={loginErr}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin()
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
            </FormControl>
            {loginErr ? (
              <Typography
                variant="caption"
                align="center"
                sx={{ color: 'red' }}
              >
                Incorrect User ID / Password!
              </Typography>
            ) : (
              ''
            )}
            <Button onClick={handleLogin}>LOG IN</Button>
          </Stack>
        </Grid>
      </Box>
    </>
  )
}

export default Login
