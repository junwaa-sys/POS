import React from 'react'
import PropTypes from 'prop-types'
import * as apis from '../../apis/users'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import {
  Container,
  TableHead,
  TextField,
  Grid,
  Backdrop,
  CircularProgress,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Users({ setUserDetails, setIsNew, setNewId }) {
  const [userList, setUserList] = React.useState(null)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [searchName, setSearchName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)

  const navigate = useNavigate()

  React.useEffect(() => {
    apis
      .getUserList()
      .then((result) => {
        setUserList(result)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(error)
      })
  }, [])

  const filteredUserList = userList?.filter((user) => {
    if (
      `${user.first_name}${user.last_name}`
        .toLowerCase()
        .includes(searchName.toLowerCase())
    ) {
      return user
    }
  })

  const rows = filteredUserList
    ?.map((user) => {
      return createData(
        user.id,
        `${user.first_name} ${user.last_name}`,
        user.email,
        user.phone,
        user.role,
        user.access_level
      )
    })
    .sort((a, b) => (a.id < b.id ? -1 : 1))

  function handleSearchName(event) {
    const searchValue = event.target.value
    setSearchName(searchValue)
  }
  function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    function handleFirstPageButtonClick(event) {
      onPageChange(event, 0)
    }

    function handleBackButtonClick(event) {
      onPageChange(event, page + 1)
    }

    function handleNextButtonClick(event) {
      onPageChange(event, page + 1)
    }

    function handleLastPageButtonClick(event) {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    )
  }

  TablePaginationActions.prototypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }

  function createData(id, name, email, phone, role, accessLevel) {
    return { id, name, email, phone, role, accessLevel }
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  function handleChangePage(event, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  async function handleRowClick(userId) {
    const response = await apis.loadUserDetails(userId)
    setUserDetails(response)
    setIsNew(false)
    navigate('/users-edit')
  }

  async function handleClick() {
    setIsNew(true)
    const { id } = await apis.getLastUserId()
    setNewId(id)
    navigate('/users-edit')
  }

  if (!rows) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  } else {
    return (
      <>
        <Grid
          container
          justifyContent="space-between"
          sx={{ marginBottom: '20px' }}
        >
          <Button variant="outlined" onClick={handleClick}>
            New
          </Button>
          <TextField
            id="search-name"
            label="Search Name"
            size="small"
            onChange={handleSearchName}
            value={searchName}
          />
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">ROLE</TableCell>
                <TableCell align="right">EMAIL</TableCell>
                <TableCell align="right">PHONE</TableCell>
                <TableCell align="right">ACCESS LEVEL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.id}
                  onClick={(e) => {
                    handleRowClick(row.id)
                  }}
                  hover
                  sx={{ ':hover': { cursor: 'pointer' } }}
                >
                  <TableCell style={{ width: 50 }} component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {row.role}
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align="right">
                    {row.phone}
                  </TableCell>
                  <TableCell style={{ width: 50 }} align="right">
                    {row.accessLevel}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={6}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    )
  }
}
