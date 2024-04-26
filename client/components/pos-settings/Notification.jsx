import React from 'react'
import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

export default function Notification({
  notificationTitle,
  notificationText,
  notificationType,
  notificationOpen,
  handleNotificationClose,
  handleNotificationCancel,
}) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={notificationOpen}
    >
      <Dialog
        open={notificationOpen}
        onClose={handleNotificationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{notificationTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {notificationText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleNotificationClose(e, notificationType)}>
            OK
          </Button>
          {notificationType != 'updateSuccess' ? (
            <Button
              onClick={(e) => handleNotificationCancel(e, notificationType)}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </Backdrop>
  )
}
