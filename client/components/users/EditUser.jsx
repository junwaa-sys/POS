import React from 'react'
import { Cookies } from 'react-cookie'
import { Box, Container, Grid, TextField } from '@mui/material'

export default function EditUser(userDetails) {
  const detailsToEdit = userDetails.userDetails
  const cookies = new Cookies()

  return (
    <Container sx={{ height: '100vh', padding: '10px' }}>
      <Grid>
        <TextField
          id="user-id"
          label="USER ID"
          InputProps={{
            readOnly: true,
          }}
          defaultValue={detailsToEdit.id}
        />
        <TextField id="user-first-name" label="First Name" />
        <TextField id="user-last-name" label="Last Name" />
        <Box>
          <Grid>
            <TextField id="user-password" label="Password" type="password" />
            <TextField id="new-password" label="New Password" type="password" />
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
            />
          </Grid>
        </Box>
        {detailsToEdit.access_level < 1 ? (
          <TextField
            id="access-level"
            label="Access Level"
            defaultValue={detailsToEdit.access_level}
          />
        ) : (
          ''
        )}
      </Grid>
    </Container>
  )
}
