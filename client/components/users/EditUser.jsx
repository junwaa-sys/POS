import { Box, Container, Grid, TextField } from '@mui/material'
import React from 'react'

export default function EditUser(userDetails) {
  const detailsToEdit = userDetails.userDetails
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
          <Gird>
            <TextField id="user-password" label="Password" type="password" />
            <TextField id="new-password" label="New Password" type="password" />
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
            />
          </Gird>
        </Box>
      </Grid>
    </Container>
  )
}
