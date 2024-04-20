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
import ResetPasswordForm from './ResetPasswordForm'

export default function EditUser({ userDetails, isNew, newId }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [successOpen, setSucccessOpen] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [alertMessage, setAlertMessage] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [detailsToEdit, setDetailsToEdit] = React.useState(null)
  const [detailsToAdd, setDetailsToAdd] = React.useState(null)
  const [notificationOpen, setNotificationOpen] = React.useState(false)
  const [notificationType, setNotificationType] = React.useState('')
  const [notificationText, setNotificationText] = React.useState('')
  const [notificationTitle, setNotificationTitle] = React.useState('')
  const [loggedInUser, setLoggedInUser] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [role, setRole] = React.useState('')
  const [accessLevel, setAccessLevel] = React.useState('')
  const cookies = new Cookies()

  React.useEffect(() => {
    setLoggedInUser(cookies.get('loggedInUser'))
    if (!isNew && userDetails) {
      setDetailsToEdit(userDetails)
      setIsLoading(false)
    } else if (newId) {
      setIsLoading(false)
      setDetailsToEdit({
        id: newId,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        accessLevel: '',
      })
    }
  }, [])

  const navigate = useNavigate()

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

  function handlePasswordReset() {
    apis
      .resetPassword(detailsToEdit.id)
      .then((res) => {
        setSuccessMessage('Password Successfully Reset.')
        setSucccessOpen(true)
      })
      .catch((error) => {
        console.log(error)
      })
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
    const modifyingUser = loggedInUser.id
    if (isNew) {
      setDetailsToEdit({ ...detailsToEdit, id: newId })
      apis
        .addUser({ detailsToEdit, modifyingUser })
        .then((res) => {
          setNotificationType('updateSuccess')
          setNotificationTitle('Save Details')
          setNotificationText('Details successfully saved.')
          setNotificationOpen(true)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      apis
        .updateUserDetails({ detailsToEdit, modifyingUser })
        .then((res) => {
          setNotificationType('updateSuccess')
          setNotificationTitle('Save Details')
          setNotificationText('Details successfully saved.')
          setNotificationOpen(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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

  if (isLoading) {
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
              defaultValue={!isNew ? detailsToEdit.id : newId}
              size="small"
            />
          </Grid>
          {!isNew ? (
            <Grid item xs={6}>
              <ResetPasswordForm
                handlePasswordChange={handlePasswordChange}
                oldPassword={oldPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                handlePasswordUpdate={handlePasswordUpdate}
                loggedInUserId={loggedInUser}
                userId={detailsToEdit?.id}
                handlePasswordReset={handlePasswordReset}
              />
            </Grid>
          ) : (
            ''
          )}
          <Grid item>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                rowSpacing={2}
                columnSpacing={2}
              >
                <Grid item>
                  <TextField
                    required
                    id="firstName"
                    label="First Name"
                    size="small"
                    value={detailsToEdit?.firstName}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="lastName"
                    label="Last Name"
                    size="small"
                    value={detailsToEdit?.lastName}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="email"
                    label="Email"
                    size="small"
                    value={detailsToEdit?.email}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="phone"
                    label="Phone"
                    size="small"
                    value={detailsToEdit?.phone}
                    onChange={handleDetailsChange}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    required
                    id="role"
                    label="Role"
                    size="small"
                    value={detailsToEdit?.role}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="accessLevel"
                    label="Access Level"
                    value={detailsToEdit?.accessLevel}
                    size="small"
                    onChange={handleDetailsChange}
                  />
                </Grid>

                <Grid item>
                  <Button type="submit">SAVE</Button>
                  <Button onClick={handleCancel}>CANCEL</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
    )
  }
}
