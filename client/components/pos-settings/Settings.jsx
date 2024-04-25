import React from 'react'
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

export default function Settings() {
  const [settings, setSettings] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [updatedSetting, setUpdatedSetting] = React.useState(null)

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
    setSettings({ ...settings, [columnName]: value })
  }

  async function handleFileSelect(event) {
    const fileData = event.target.files[0]
    const formData = new FormData()
    formData.append('image', fileData)
    const logoUpdated = await apis.uploadLogo(formData)
    setUpdatedSetting(logoUpdated)
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
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Box>
            <img
              width="150"
              height="150"
              src={settings.logoUrl ? settings.logoUrl : '/images/no_image.png'}
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
            id="poilicy"
            label="Policy"
            size="small"
            value={settings.policy}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="numberOfPos"
            label="Number of POS"
            size="small"
            type="number"
            value={settings.numberOfPos}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button>SAVE</Button>
          <Button>CANCEL</Button>
        </Grid>
      </Grid>
    )
  }
}
