import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  const [detailsToEdit, setDetailsToEdit] = React.useState(null)
  const [notificationOpen, setNotificationOpen] = React.useState(false)
  const [notificationType, setNotificationType] = React.useState('')
  const [notificationText, setNotificationText] = React.useState('')
  const [notificationTitle, setNotificationTitle] = React.useState('')

  React.useEffect(() => {
    setDetailsToEdit(userDetails.userDetails)
  }, [])

  const navigate = useNavigate()
  const cookies = new Cookies()

  function handlePasswordChange(event) {
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

  function handleDetailsChange(event) {
    const dataName = event.target.id
    const value = event.target.value
    setDetailsToEdit({ ...detailsToEdit, [dataName]: value })
  }

  function handleNoficationClose(event, notificationType) {
    if (notificationType === 'updateCancel') {
      setNotificationOpen(false)
      navigate(-1)
    } else if (notificationType === 'updateSuccess') {
      setNotificationOpen(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const loggedInUser = cookies.get('loggedInUser')
    const modifyingUser = loggedInUser.id
    apis
      .updateUserDetails({ detailsToEdit, modifyingUser })
      .then((res) => {
        setNotificationType('updateSuccess')
        setNotificationTitle('Save Details')
        setNotificationText('Details successfully saved.')
        setNotificationOpen(true)
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function handleCancel() {
    setNotificationType('updateCancel')
    setNotificationTitle('Warning!')
    setNotificationText('Any Unsaved Details will be lost.')
    setNotificationOpen(true)
  }

  function handleNoficationCancel() {
    setNotificationOpen(false)
  }

  if (detailsToEdit === null) {
    return <p>Data is not available</p>
  } else {
    return (
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={notificationOpen}
        >
          <Dialog
            open={notificationOpen}
            onClose={handleNoficationClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {notificationTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {notificationText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => handleNoficationClose(e, notificationType)}
              >
                OK
              </Button>
              {notificationType != 'updateSuccess' ? (
                <Button
                  onClick={(e) => handleNoficationCancel(e, notificationType)}
                >
                  Cancel
                </Button>
              ) : (
                ''
              )}
            </DialogActions>
          </Dialog>
        </Backdrop>
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
                      onChange={handlePasswordChange}
                      value={oldPassword}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="new-password"
                      label="New Password"
                      type="password"
                      size="small"
                      onChange={handlePasswordChange}
                      value={newPassword}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="confirm-password"
                      label="Confirm Password"
                      type="password"
                      size="small"
                      onChange={handlePasswordChange}
                      value={confirmPassword}
                    />
                  </Grid>
                  <Grid item>
                    <Button onClick={handlePasswordUpdate}>
                      Reset Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                required
                id="firstName"
                label="First Name"
                size="small"
                value={detailsToEdit.firstName}
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="lastName"
                label="Last Name"
                size="small"
                value={detailsToEdit.lastName}
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="email"
                label="Email"
                size="small"
                value={detailsToEdit.email}
                onChange={handleDetailsChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="phone"
                label="Phone"
                size="small"
                value={detailsToEdit.phone}
                onChange={handleDetailsChange}
              />
            </Grid>

            {detailsToEdit.accessLevel <= 1 ? (
              <>
                <Grid item>
                  <TextField
                    required
                    id="role"
                    label="Role"
                    size="small"
                    value={detailsToEdit.role}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="accessLevel"
                    label="Access Level"
                    value={detailsToEdit.accessLevel}
                    size="small"
                    onChange={handleDetailsChange}
                  />
                </Grid>
              </>
            ) : (
              ''
            )}
            <Grid item>
              <Button type="submit">SAVE</Button>
              <Button onClick={handleCancel}>CANCEL</Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}
