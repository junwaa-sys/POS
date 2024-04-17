import React from 'react'
import * as apis from '../../apis/users'
import { Cookies } from 'react-cookie'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Grid,
  TextField,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function EditUser(userDetails) {
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [successOpen, setSucccessOpen] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [alertMessage, setAlertMessage] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const detailsToEdit = userDetails.userDetails
  function handleSubmit(event) {
    event.preventDefault()
    console.log('submit')
  }

  function handleChange(event) {
    const passwordType = event.target.id
    const value = event.target.value
    if (passwordType === 'old-password') {
      setOldPassword(value)
    } else if (passwordType === 'new-password') {
      setNewPassword(value)
    } else {
      setConfirmPassword(value)
    }
  }

  async function handlePasswordUpdate() {
    const userId = detailsToEdit.id
    if (newPassword === confirmPassword) {
      const response = await apis.updatePassword(
        userId,
        oldPassword,
        newPassword
      )

      if (response.error) {
        setAlertMessage('Incorrect Password')
        setAlertOpen(true)
      } else {
        setSuccessMessage('Password updated.')
        setSucccessOpen(true)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } else {
      setAlertMessage('new password is not correctly re-entered.')
      setAlertOpen(true)
    }
  }

  return (
    <>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {alertMessage}
        </Alert>
      </Collapse>
      <Collapse in={successOpen}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSucccessOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          rowSpacing={2}
          columnSpacing={2}
        >
          <Grid item xs={6}>
            <TextField
              id="user-id"
              label="USER ID"
              InputProps={{
                disabled: true,
              }}
              defaultValue={detailsToEdit.id}
              size="small"
            />
          </Grid>
          <Grid item>
            <Box p={1} sx={{ border: '1px solid grey' }}>
              <Grid
                container
                direction="column"
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid item>
                  <TextField
                    id="old-password"
                    label="Old Password"
                    type="password"
                    size="small"
                    onChange={handleChange}
                    value={oldPassword}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="new-password"
                    label="New Password"
                    type="password"
                    size="small"
                    onChange={handleChange}
                    value={newPassword}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    size="small"
                    onChange={handleChange}
                    value={confirmPassword}
                  />
                </Grid>
                <Grid item>
                  <Button onClick={handlePasswordUpdate}>Reset Password</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <TextField
              required
              id="user-first-name"
              label="First Name"
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="user-last-name"
              label="Last Name"
              size="small"
            />
          </Grid>
          <Grid item>
            <TextField required id="role" label="Role" size="small" />
          </Grid>

          {detailsToEdit.access_level <= 1 ? (
            <Grid item>
              <TextField
                id="access-level"
                label="Access Level"
                defaultValue={detailsToEdit.access_level}
                size="small"
              />
            </Grid>
          ) : (
            ''
          )}
          <Grid item>
            <Button type="submit">SAVE</Button>
            <Button>CANCEL</Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
