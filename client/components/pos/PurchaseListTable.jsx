import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { InputAdornment, OutlinedInput, TextField } from '@mui/material'

export default function PurchaseListTable({
  purchasedList,
  setPurchasedList,
  handleChangePurchase,
  handleDiscPercentChange,
  handleDiscChange,
}) {
  const headers = [
    'name',
    'qty',
    'unit price',
    'Disc',
    'Disc%',
    'total Disc',
    'total price',
  ]

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="purchase-table" size="small">
          <TableHead>
            <TableRow>
              {headers.map((head, index) => {
                return (
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    key={index}
                  >
                    {head}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchasedList?.map((purchase, index) => {
              return (
                <TableRow hover key={index}>
                  <TableCell width="300">{purchase.productName}</TableCell>
                  <TableCell align="center" width="50">
                    {purchase.qty}
                  </TableCell>
                  <TableCell align="right" width="100">
                    {purchase.unitPrice}
                  </TableCell>
                  <TableCell width="150">
                    <OutlinedInput
                      size="small"
                      value={purchase.disc}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      onFocus={(event) => {
                        event.target.select()
                      }}
                      onChange={(e) => {
                        handleDiscChange(e, purchase.id)
                      }}
                    />
                  </TableCell>
                  <TableCell width="150">
                    <OutlinedInput
                      size="small"
                      value={purchase.discPercent}
                      align="right"
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                      onFocus={(event) => {
                        event.target.select()
                      }}
                      onChange={(e) => {
                        handleDiscPercentChange(e, purchase.id)
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" width="150">
                    {purchase.totalDisc}
                  </TableCell>
                  <TableCell align="right" width="150">
                    {purchase.totalPrice}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
