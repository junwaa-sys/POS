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

  const [isLoading, setIsLoading] = React.useState(true)

  const cookies = new Cookies()
  const navigate = useNavigate()

  React.useEffect(() => {
    setLoggedInUser(cookies.get('loggedInUser'))
    if (isNewProduct) {
      setProductDetails({
        id: newProductId,
        productName: '',
        description: '',
        sellingPrices: [],
        categoryId: null,
        categoryName: '',
        unitCost: null,
        saleUnit: 1,
        StartQty: 0,
        adjQty: 0,
        status: 'active',
      })
    }
  }, [])

  function handleChange(event) {
    const value = event.target.value
    const columnName = event.target.id
    if (event.target.type === 'number') {
      const parsedValue = parseFloat(value)
      setProductDetails({ ...productDetails, [columnName]: parsedValue })
    } else {
      setProductDetails({ ...productDetails, [columnName]: value })
    }
  }

  function handlePricesChange(event, priceId) {
    const value = parseFloat(event.target.value)
    const updatedPrices = productDetails.sellingPrices.map((price) => {
      if (price.id === priceId) {
        return { ...price, price: value }
      }
      return price
    })

    setProductDetails({ ...productDetails, sellingPrices: updatedPrices })
  }

  function handleNoficationClose(event, notificationType) {
    if (notificationType === 'updateCancel') {
      setNotificationOpen(false)
      navigate(-1)
    } else if (notificationType === 'updateSuccess') {
      setNotificationOpen(false)
    }
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
    } else {
      apis
        .updateProduct(productDetails)
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

  if (productDetails === null) {
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
                  onClick={(e) => handleNoficationCancel(e, notificationType)}
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
                inputProps={{ disabled: true, readOnly: true }}
                defaultValue={productDetails.id}
              />
            </Grid>
            <Grid item>
              <TextField
                id="productName"
                label="NAME"
                value={productDetails.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="description"
                label="DESCRIPTION"
                value={productDetails.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" rowSpacing={2} maxWidth={200}>
                {productDetails.sellingPrices.map((price, index) => {
                  const label = `Level ${price.level}`
                  return (
                    <Grid item key={index}>
                      <TextField
                        required
                        id={`${productDetails.id}-${price.id}`}
                        label={label}
                        type="number"
                        value={price.price}
                        onChange={(e) => {
                          handlePricesChange(e, price.id)
                        }}
                      />
                    </Grid>
                  )
                })}
                <Button>SAVE PRICES</Button>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                id="unitCost"
                label="UNIT COST"
                type="number"
                value={productDetails.unitCost}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="saleUnit"
                label="SALES UNIT"
                type="number"
                value={productDetails.saleUnit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="startQty"
                label="INITIAL QTY"
                type="number"
                value={productDetails.startQty}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                id="adjQty"
                label="ADJ QTY"
                type="number"
                value={productDetails.adjQty}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Select
                labelId="status"
                id="status"
                value={productDetails.status}
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
