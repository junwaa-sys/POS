import { Collapse, Alert, IconButton, AlertTitle } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'

export default function AlertDisplay({
  alertOpen,
  setAlertOpen,
  alertText,
  alertType,
}) {
  return (
    <Collapse in={alertOpen}>
      <Alert
        severity={alertType}
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
        <AlertTitle>{alertType}</AlertTitle>
        {alertText}
      </Alert>
    </Collapse>
  )
}
