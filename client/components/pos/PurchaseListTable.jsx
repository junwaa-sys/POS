import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { TextField } from '@mui/material'

export default function PurchaseListTable({
  purchasedList,
  setPurchasedList,
  handleChangePurchase,
}) {
  const headers = ['name', 'qty', 'unit price', 'disc', 'disc%', 'total price']

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((head, index) => {
                return <TableCell key={index}>{head}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchasedList?.map((purchase, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell>{purchase.productName}</TableCell>
                  <TableCell>{purchase.qty}</TableCell>
                  <TableCell>{purchase.unitPrice}</TableCell>
                  <TableCell>
                    <TextField size="small" value={purchase.disc} />
                  </TableCell>
                  <TableCell>
                    <TextField size="small" value={purchase.discPercent} />
                  </TableCell>
                  <TableCell>{purchase.totalPrice}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
