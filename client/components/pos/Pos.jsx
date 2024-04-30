import React from 'react'
import * as productApis from '../../apis/products'
import * as settingApis from '../../apis/settings'
import PurchaseList from '../pos/PurchaseListTable'
import {
  Backdrop,
  Button,
  Container,
  Grid,
  TextField,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from '@mui/material'

function Pos() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [productBarcode, setProductBarcode] = React.useState('')
  const [productList, setProductList] = React.useState([])
  const [settings, setSettings] = React.useState([])
  const [purchasedList, setPurchasedList] = React.useState([])
  const [labelName, setLabelName] = React.useState('Barcode')

  React.useEffect(() => {
    getProducts()
    getSettings()
  }, [])

  async function getProducts() {
    const products = await productApis.getProducts()
    setProductList(products)
    setIsLoading(false)
  }

  async function getSettings() {
    const settings = await settingApis.getSettings()
    setSettings(settings)
  }

  async function handleProductSelect(event) {
    const pressedKey = event.key
    const productId = parseInt(event.target.value)

    if (pressedKey === 'Enter') {
      const selectedProduct = await productList.filter(
        (product) => product.id == productId
      )

      const duplication = await purchasedList.filter(
        (product) => product.id == productId
      )

      if (duplication.length > 0) {
        setPurchasedList((arr) => {
          arr.map((ele) => {
            if (ele.id === productId) {
              ele.qty += 1
            }
            return ele
          })
          console.log(arr)
          return arr
        })
      } else {
        setPurchasedList([
          ...purchasedList,
          {
            id: selectedProduct[0].id,
            productName: selectedProduct[0].productName,
            qty: 1,
          },
        ])
      }
      setProductBarcode('')
    }
  }

  function handleBarcodeChange(event) {
    setProductBarcode(event.target.value)
  }

  function handleChangePurchase(event, index) {
    //update purchase list when add new product or update discount.
    //distingush discount by amount or by %
    console.log(event)
  }

  function handleSelect(event) {
    //change between select product based on barcode reader or serch name or id.
    const serachType = event.target.value
    setLabelName(serachType)
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
      <Container maxWidth="100vw">
        <Grid container columnSpacing={2}>
          <Grid item>
            <TextField
              label={labelName}
              size="small"
              autoFocus
              sx={{ marginBottom: '20px' }}
              value={productBarcode}
              onChange={handleBarcodeChange}
              onKeyDown={handleProductSelect}
            />
          </Grid>
          <Grid item>
            <RadioGroup row onChange={handleSelect} defaultValue="Barcode">
              <FormControlLabel
                value="Barcode"
                control={<Radio />}
                label="Barcode"
              />
              <FormControlLabel
                value="Searach"
                control={<Radio />}
                label="Search"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container>
          <PurchaseList
            purchasedList={purchasedList}
            setPurchaseList={setPurchasedList}
            handleChangePurchase={handleChangePurchase}
          />
        </Grid>
      </Container>
    )
  }
}

export default Pos
