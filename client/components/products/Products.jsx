import React from 'react'
import * as apis from '../../apis/producsts'

export default function Products() {
  const [productList, setProductList] = React.useState(null)

  async function loadList() {
    const result = await apis.getProducts()
    setProductList(result)
  }

  React.useEffect(async () => {
    loadList()
  }, [productList])

  console.log(productList)
  return <p>Products</p>
}
