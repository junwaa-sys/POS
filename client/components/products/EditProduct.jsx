import React from 'react'
import * as apis from '../../apis/products'
import {
  Grid,
  TextField,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Cookies } from 'react-cookie'

export default function EditProduct({
  newProductId,
  productIdForEdit,
  productDetails,
  setProductDetails,
  isNewProduct,
}) {
  const [notificationOpen, setNotificationOpen] = React.useState(false)
  const [notificationTitle, setNotificationTitle] = React.useState('')
  const [notificationText, setNotificationText] = React.useState('')
  const [notificationType, setNotificationType] = React.useState('')
  const [loggedInUser, setLoggedInUser] = React.useState('')
  const [detailsToEdit, setDetailsToEdit] = React.useState('')

  const [isLoading, setIsLoading] = React.useState(true)

  const cookies = new Cookies()
  const navigate = useNavigate()

  React.useEffect(() => {
    setLoggedInUser(cookies.get('loggedInUser'))
    if (!isNewProduct && productDetails) {
      setDetailsToEdit(productDetails)
      setIsLoading(false)
    } else {
      setDetailsToEdit({
        id: newProductId,
        productName: '',
        description: '',
        sellingPrices: [
          { level: 1, price: 0 },
          { level: 2, price: 0 },
          { level: 3, price: 0 },
        ],
        categoryId: 1,
        categoryName: '',
        unitCost: 0,
        saleUnit: 1,
        startQty: 0,
        adjQty: 0,
        status: 'active',
      })
      setIsLoading(false)
    }
  }, [])

  function handleChange(event) {
    const value = event.target.value
    const columnName = event.target.id
    if (event.target.type === 'number') {
      const parsedValue = parseFloat(value)
      setDetailsToEdit({ ...detailsToEdit, [columnName]: parsedValue })
    } else {
      setDetailsToEdit({ ...detailsToEdit, [columnName]: value })
    }
  }

  function handlePricesChange(event, PriceIndex) {
    const value = parseFloat(event.target.value)
    const updatedPrices = detailsToEdit.sellingPrices.map((price, index) => {
      if (index === PriceIndex) {
        return { ...price, price: value }
      }
      return price
    })

    setDetailsToEdit({ ...detailsToEdit, sellingPrices: updatedPrices })
  }

  function handleNoficationClose(event, notificationType) {
    if (notificationType === 'updateCancel') {
      setNotificationOpen(false)
      navigate(-1)
    } else if (notificationType === 'updateSuccess') {
      setNotificationOpen(false)
    }
  }

  function handleNotificationCancel() {
    setNotificationOpen(false)
  }

  function handleCancel() {
    setNotificationType('updateCancel')
    setNotificationTitle('Warning!')
    setNotificationText('Any Unsaved Details will be lost.')
    setNotificationOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const modifyingUser = loggedInUser.id
    if (isNewProduct) {
      apis
        .addProduct(detailsToEdit)
        .then((res) => {
          setNotificationType('updateSuccess')
          setNotificationTitle('Save Details')
          setNotificationText('Details successfully saved.')
          setNotificationOpen(true)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      apis
        .updateProduct(detailsToEdit)
        .then((res) => {
          setNotificationType('updateSuccess')
          setNotificationTitle('Save Details')
          setNotificationText('Details successfully saved.')
          setNotificationOpen(true)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  if (isLoading) {
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={notificationOpen}
        >
          <Dialog
            open={notificationOpen}
            onClose={handleNoficationClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {notificationTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {notificationText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={(e) => handleNoficationClose(e, notificationType)}
              >
                OK
              </Button>
              {notificationType != 'updateSuccess' ? (
                <Button
                  onClick={(e) => handleNotificationCancel(e, notificationType)}
                >
                  Cancel
                </Button>
              ) : (
                ''
              )}
            </DialogActions>
          </Dialog>
        </Backdrop>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            rowSpacing={2}
            columnSpacing={2}
          >
            <Grid item>
              <TextField
                id="product-id"
                label="ID"
                size="small"
                inputProps={{ disabled: true, readOnly: true }}
                defaultValue={detailsToEdit.id}
              />
            </Grid>
            <Grid item>
              <TextField
                id="productName"
                label="NAME"
                size="small"
                value={detailsToEdit.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="description"
                label="DESCRIPTION"
                size="small"
                value={detailsToEdit.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" rowSpacing={2} maxWidth={200}>
                {detailsToEdit.sellingPrices.map((price, index) => {
                  const label = `Level ${price.level}`
                  return (
                    <Grid item key={index}>
                      <TextField
                        required
                        size="small"
                        id={`${detailsToEdit.id}-${price.id}`}
                        label={label}
                        type="number"
                        value={price.price}
                        onChange={(e) => {
                          handlePricesChange(e, index)
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="unitCost"
                label="UNIT COST"
                size="small"
                type="number"
                value={detailsToEdit.unitCost}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="saleUnit"
                label="SALES UNIT"
                size="small"
                type="number"
                value={detailsToEdit.saleUnit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="startQty"
                label="INITIAL QTY"
                size="small"
                type="number"
                value={detailsToEdit.startQty}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="adjQty"
                label="ADJ QTY"
                size="small"
                type="number"
                value={detailsToEdit.adjQty}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Select
                labelId="status"
                size="small"
                id="status"
                value={detailsToEdit.status}
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="inactive">inactive</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Button type="submit">SAVE</Button>
              <Button onClick={handleCancel}>CANCEL</Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}
