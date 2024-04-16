export async function getLastUserId() {
  try {
    const response = await fetch(`api/user/get-last-id`, {
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

export async function getUserList() {
  try {
  } catch (error) {}
}
