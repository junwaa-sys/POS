import { Box, Grid, TextField } from '@mui/material'
import React from 'react'

export default function EditUser(userDetails) {
  const detailsToEdit = userDetails.userDetails
  return (
    <Box>
      <Grid>
        <TextField
          id="user-id"
          label="USER ID"
          InputProps={{
            readOnly: true,
          }}
          defaultValue={detailsToEdit.id}
        />
      </Grid>
    </Box>
  )
}
