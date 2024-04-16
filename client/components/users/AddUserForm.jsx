import React from 'react'
import * as apis from '../../apis/users'
import { Box } from '@mui/material'

export default function AddUsers() {
  const lastUserIdRef = React.useRef('')

  React.useEffect(() => {
    lastUserIdRef.current = apis.getLastUserId()
  }, [])

  return (
    <Box>
      <h1>User add Form</h1>
    </Box>
  )
}
