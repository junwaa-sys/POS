export async function getUserDetails(userId, password) {
  try {
    const response = await fetch(`api/users/get/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, password: password }),
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
