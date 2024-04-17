export async function getLastUserId() {
  try {
    const response = await fetch(`api/users/get-last-id`, {
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
    const response = await fetch('api/users/get-list', {
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

export async function updatePassword(userId, oldPassword, newPassword) {
  try {
    const response = await fetch(`api/users/update-password`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, oldPassword, newPassword }),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export async function loadUserDetails(userId) {
  try {
    const response = await fetch('api/users/load-details', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}
