import React from 'react'
import { Cookies } from 'react-cookie'
import { Box, Button, Grid, TextField } from '@mui/material'

export default function EditUser(userDetails) {
  const detailsToEdit = userDetails.userDetails
  function handleSubmit(event) {
    event.preventDefault()
    console.log('submit')
  }
  return (
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
            <Grid container direction="column" rowSpacing={2} columnSpacing={2}>
              <Grid item>
                <TextField
                  id="old-password"
                  label="Old Password"
                  type="password"
                  size="small"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="new-password"
                  label="New Password"
                  type="password"
                  size="small"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="confirm-password"
                  label="Confirm Password"
                  type="password"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button>Reset Password</Button>
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
  )
}
