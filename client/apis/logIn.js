export async function getUserDetails(userId) {
  try {
    const response = await fetch(`api/users/get`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
