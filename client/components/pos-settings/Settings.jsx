import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as apis from '../../apis/settings'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageListItem,
  TextField,
  styled,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Notification from './Notification'
import AlertDisplay from './Alerts'

export default function Settings() {
  const [settings, setSettings] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [updatedSetting, setUpdatedSetting] = React.useState(null)
  const [notificationOpen, setNotificationOpen] = React.useState(false)
  const [notificationTitle, setNotificationTitle] = React.useState('')
  const [notificationText, setNotificationText] = React.useState('')
  const [notificationType, setNotificationType] = React.useState('')
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [alertType, setAlertType] = React.useState('')
  const [alertText, setAlertText] = React.useState('')

  const navigate = useNavigate()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  async function getSettings() {
    const result = await apis.getSettings()
    setSettings(result)
    setIsLoading(false)
  }
  React.useEffect(() => {
    getSettings()
  }, [updatedSetting])

  function handleChange(event) {
    const columnName = event.target.id
    const value = event.target.value
    const valueType = event.target.type
    if (valueType === 'number') {
      if (value < 0 || value % 1 > 0) {
        setAlertType('error')
        setAlertText('Entered Number is invalid')
        setAlertOpen(true)
      } else {
        setSettings({ ...settings, [columnName]: value })
      }
    } else {
      setSettings({ ...settings, [columnName]: value })
    }
  }

  async function handleFileSelect(event) {
    const fileData = event.target.files[0]
    const formData = new FormData()
    formData.append('image', fileData)
    const logoUpdated = await apis.uploadLogo(formData)
    setUpdatedSetting(logoUpdated)
  }

  function handleUpdate() {
    setIsLoading(true)
    apis
      .updateSettings(settings)
      .then((res) => {
        setIsLoading(false)
        setNotificationType('updateSuccess')
        setNotificationText('Saved Successfully')
        setNotificationTitle('Save Details')
        setNotificationOpen(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleNotificationClose(event, notificationType) {
    if (notificationType === 'updateCancel') {
      setNotificationOpen(false)
      navigate(-1)
    } else if (notificationType === 'updateSuccess') {
      setNotificationOpen(false)
    }
  }

  function handleNotificationCancel() {
    setNotificationOpen(false)
  }

  function handleCancel() {
    setNotificationType('updateCancel')
    setNotificationTitle('Warning!')
    setNotificationText('Any Unsaved Details will be lost.')
    setNotificationOpen(true)
  }

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  } else {
    return (
      <>
        <Notification
          notificationTitle={notificationTitle}
          notificationText={notificationText}
          notificationType={notificationType}
          notificationOpen={notificationOpen}
          handleNotificationClose={handleNotificationClose}
          handleNotificationCancel={handleNotificationCancel}
        />
        <AlertDisplay
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          alertText={alertText}
          alertType={alertType}
        />
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <Box>
              <img
                width="150"
                height="150"
                src={
                  settings.logoUrl ? settings.logoUrl : '/images/no_image.png'
                }
              />
            </Box>
            <Button
              component="label"
              size="small"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileSelect}
            >
              Upload Logo
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
          <Grid item>
            <TextField
              id="companyName"
              label="Company Name"
              size="small"
              value={settings.companyName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="tradeName"
              label="Trade Name"
              size="small"
              value={settings.tradeName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item>
            <TextField
              id="email"
              label="Email"
              size="small"
              value={settings.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="policy"
              label="Policy"
              size="small"
              value={settings.policy}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="priceLevels"
              label="Price Levels"
              size="small"
              type="number"
              value={settings.priceLevels}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="numberOfPos"
              label="Number of POS"
              size="small"
              type="number"
              inputProps={{ step: 1, pattern: '[0-9]{10}' }}
              value={settings.numberOfPos}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button onClick={handleUpdate}>SAVE</Button>
            <Button onClick={handleCancel}>CANCEL</Button>
          </Grid>
        </Grid>
      </>
    )
  }
}
