import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Login from '../components/users/Login'
import EditUser from '../components/users/EditUser'
import { Cookies } from 'react-cookie'

function ResponsiveAppBar({
  loggedInUser,
  handleChange,
  handleLogin,
  loginErr,
  setLoggedInUser,
  setUserDetails,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [showPassword, setShowPassword] = React.useState(false)

  const navigate = useNavigate()
  const cookies = new Cookies()

  const pages = ['DASHBOARD', 'SALES', 'PRODUCTS', 'POS', 'USERS']
  const pagesWithAccessLevel = [
    { link: 'DASHBOARD', accessLevel: 3 },
    { link: 'SALES', accessLevel: 3 },
    { link: 'PRODUCTS', accessLevel: 3 },
    { link: 'POS', accessLevel: 3 },
    { link: 'USERS', accessLevel: 1 },
  ]
  const settings = ['Account', 'Logout']

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null)
    const linkTo = event.target.innerText.toLowerCase()
    navigate(`/${linkTo}`)
  }

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null)
    if (event.target.innerHTML === 'Logout') {
      setLoggedInUser(null)
      cookies.remove('loggedInUser')
      navigate('/')
    } else if (event.target.innerHTML === 'Account') {
      setUserDetails(cookies.get('loggedInUser'))
      navigate('/users-edit')
    }
  }

  if (cookies.get('loggedInUser') === undefined) {
    return (
      <Login
        handleChange={handleChange}
        handleLogin={handleLogin}
        loginErr={loginErr}
      />
    )
  } else {
    return (
      <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pagesWithAccessLevel.map((page) => {
                  if (loggedInUser) {
                    if (page.accessLevel >= loggedInUser.accessLevel) {
                      return (
                        <Button
                          key={page.link}
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {page.link}
                        </Button>
                      )
                    }
                  }
                })}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="User Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/broken-image.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{ paddingTop: '30px' }}>
          <Outlet />
        </Container>
      </>
    )
  }
}
export default ResponsiveAppBar
