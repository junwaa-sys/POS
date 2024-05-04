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
  FormControl,
} from '@mui/material'

function Pos() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [productBarcode, setProductBarcode] = React.useState('')
  const [productList, setProductList] = React.useState([])
  const [settings, setSettings] = React.useState([])
  const [purchasedList, setPurchasedList] = React.useState([])
  const [labelName, setLabelName] = React.useState('Barcode')
  const [priceLevels, setPriceLevels] = React.useState([])
  const [selectedPriceLevel, setSelectedPriceLevel] = React.useState(1)

  React.useEffect(() => {
    getProducts()
    getSettings()
      .then((res) => {
        setPriceLevelDisplay(res.priceLevels)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(
          `error occured while loading price level setting, error: ${error}`
        )
      })
  }, [])

  async function getProducts() {
    const products = await productApis.getProducts()
    setProductList(products)
  }

  async function getSettings() {
    const settings = await settingApis.getSettings()
    return settings
    // setSettings(settings)
  }

  function setPriceLevelDisplay(setPriceLevel) {
    const tempPriceLevels = []
    for (let i = 1; i <= setPriceLevel; i++) {
      tempPriceLevels.push(i)
    }
    setPriceLevels(tempPriceLevels)
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

  function handlePriceLevelChange(event) {
    const selectedValue = event.target.value
    setSelectedPriceLevel(selectedValue)
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
        <Grid container justifyContent="space-between">
          <Grid item>
            <Grid container direction="row" columnSpacing={2}>
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
          </Grid>
          <Grid item>
            <Select
              labelId="price-level"
              size="small"
              id="price-level"
              value={selectedPriceLevel}
              onChange={handlePriceLevelChange}
              autoWidth
            >
              {priceLevels?.map((level) => {
                return (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                )
              })}
            </Select>
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
