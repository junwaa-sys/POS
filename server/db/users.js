const connection = require('./connection')

function getUserList(db = connection) {
  return db('users').select('*')
}

function getUserDetails(loginId, db = connection) {
  return db('users')
    .select(
      'id',
      'email',
      'phone',
      'password',
      'first_name as firstName',
      'last_name as lastName',
      'role',
      'access_level as accessLevel'
    )
    .where('id', loginId)
    .first()
}

function getLastUserId(db = connection) {
  return db('users').max('id')
}

async function updatePassword(userId, newHashedPassword, db = connection) {
  return db('users').update('password', newHashedPassword).where('id', userId)
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
      phone: newDetails.phone,
      first_name: newDetails.firstName,
      last_name: newDetails.lastName,
      role: newDetails.role,
      access_level: newDetails.accessLevel,
      modified_by_id: modifyingUser,
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
  getLastUserId,
  getUserList,
}
