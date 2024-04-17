import { Button } from '@mui/material'
import React from 'react'
import * as apis from '../apis/users'

function testfunc() {
  apis.updatePassword('2', '2', '2')
}
function Pos() {
  return <Button onClick={testfunc}>TEST</Button>
}

export default Pos
