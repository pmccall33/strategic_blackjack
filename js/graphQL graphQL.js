type Query {
  me: User
}

type User {
  id: ID
  name: String
}
// Along with functions for each field on each type:

function Query_me(request) {
  return request.auth.user;
}

function User_name(user) {
  return user.getName();
}