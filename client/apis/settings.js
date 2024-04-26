export async function getSettings() {
  try {
    const response = await fetch('api/settings/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export async function uploadLogo(fileData) {
  try {
    const response = await fetch('api/settings/upload-logo', {
      method: 'POST',
      body: fileData,
    })
    const json = response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export async function updateSettings(settings) {
  try {
    const result = await fetch('api/settings/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
    const json = result.json()
    return json
  } catch (error) {
    console.error(error)
  }
}
