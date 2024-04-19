import React from 'react'
import { Grid, Box, TextField, Button } from '@mui/material'

export default function ResetPasswordForm({
  handlePasswordChange,
  oldPassword,
  newPassword,
  confirmPassword,
  handlePasswordUpdate,
  handlePasswordReset,
  userId,
  loggedInUserId,
}) {
  if (loggedInUserId.id === userId) {
    return (
      <>
        <Grid item>
          <Box p={1} sx={{ border: '1px solid grey' }}>
            <Grid container direction="column" rowSpacing={2} columnSpacing={2}>
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
                <Button onClick={handlePasswordUpdate}>Reset Password</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </>
    )
  } else {
    return (
      <Grid item>
        <Button onClick={handlePasswordReset}>Reset Password</Button>
      </Grid>
    )
  }
}
