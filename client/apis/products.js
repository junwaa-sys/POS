export async function getProducts() {
  try {
    const response = await fetch('api/products/get-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export async function updateProduct(productDetails) {
  try {
    const response = await fetch('api/products/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDetails),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export async function addProduct(productDetails) {
  try {
    const response = await fetch('api/products/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productDetails),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
