export const typeDefs = `
type User{
    id:ID
    name:String
    email:String
}
type Query {
    allUsers: [User]
    userByName(name: String!): User
  }

type AuthPayload {
    token: String
    user: User
  }
  
    input UserInput{
        name:String
        email:String
        password:String
    }

    type Mutation{
        createUser(user:UserInput):User
        login(email: String, password: String): AuthPayload
    }
`