import { app } from "./app";

app.listen(3334, () => console.log("Server is running"));






// //ORM MAPEAMENTO ENTRE OS PROJETOS, MINIMIZA-SE O ESFORÇO
// /**
//  *  GET => busca
//  *  POST => Salvar
//  *  PUT => alterar
//  *  DELETE => Delete
//  *  PATCH => Alteração especifica
//  */
// //ORM NÃO É NECESSARIO TANTO CONHECIMENTO DO SQL PURO
// //https://localhost:3334/users


// app.get("/", (request, response) => {
//     return response.json({message: "Hello World - NLW04"})
// });

// // 1 param => Rota(Recurso API)
// // 2 param => reques, response
// // Pode se ter a mesma rota porem com metodos diferentes

// app.post("/", (request, response) => {
//     //Receber dados para salvar
//     return response.json({message: "Os dados foram salvos com sucesso"})
// });

