export const typeDefs = `
type Stand{
    id: ID
    nombre: String
    tipo: String
    usuario: String
    descripcion: String
}

    type Query{
        stands: [Stand]
        stand(id: ID):Stand
        standsByType(tipo: String): [Stand]
    }    

    input StandInput{
        nombre:String
        tipo:String 
        usuario:String
        descripcion:String
     }
 

    type Mutation{
        createStand(stand:StandInput):Stand
        deleteStand(id:ID!):Stand
        updateStand(id: ID!, stand: StandInput): Stand
    }
`;
