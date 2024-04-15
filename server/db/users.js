const connection = require('./connection')

function getUserDetails(loginId, loginPassword, db = connection) {
  return db('users')
    .select('*')
    .where('id', loginId)
    .andWhere('login_password', loginPassword)
}

function updatePassword(loginId, newPassword, db = connection) {
  return db('users').update('login_password', newPassword).where('id', loginId)
}

function addUser(addingUser, userDetails, db = connection) {
  return db('users').insert({
    email: userDetails.email,
    first_name: userDetails.firstName,
    last_name: userDetails.lastName,
    role: userDetails.role,
    access_level: userDetails.accessLevel,
    created_by_id: addingUser.id,
  })
}

function updateUserDetails(
  loginId,
  newDetails,
  modifyingUser,
  db = connection
) {
  return db('users')
    .update({
      email: newDetails.email,
      first_name: newDetails.firstName,
      last_name: newDetails.lastName,
      modified_by_id: modifyingUser.id,
    })
    .where('id', loginId)
}

function deleteUser(userId, db = connectino) {
  return db('users').del().where('id', userId)
}
module.exports = {
  getUserDetails,
  updatePassword,
  updateUserDetails,
  addUser,
  deleteUser,
}