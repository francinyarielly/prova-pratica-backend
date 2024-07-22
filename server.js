//Paciência e uma boa prova. Que a Força esteja com você!
import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.
import fs from 'node:fs';
import {createServer, request} from 'node:http';
import { URLSearchParams } from 'node:url';
import lerDadosLivros from './helper/lerDadosLivros';

const PORT = 3333;

const server = createServer((request, response) => {
    const {url, method} = request;

    if(method === "POST" && url === "/livros"){
        let body = ""
        request.on("data", (chunk) => {
            body += chunk;
        })
        request.on("end", () => {
            const novoLivro = JSON.parse(body)
            lerDadosLivros((err, livros) => {
                if(err){
                    response.writeHead(500, {"content-type" : "application/json"});
                    response.end(JSON.stringify({message: "Erro ao ler livros"}));
                    return;
                }
                novoLivro.id = uuidv4();
                livros.push(novoLivro);

                fs.writeFile("livros.json", JSON.stringify(livros, null, 2), (err) => {
                    if(err){
                        response.writeHead(500, {"Content-Type" : "Application/json"});
                        response.end(JSON.stringify({message: "Erro ao cadastrar livros"}));
                        return;
                    }
                    response.writeHead(201, {"Content-Type" : "Application/json"});
                    response.end(JSON.stringify(novoLivro));
                    
                })
            })
        })       
    }else if(method === "POST" && url === "/autores"){
        let body = ''
        request.on("data", (chunk) => {
            body += chunk;
        })
        request.on("end", () => {
            const novoAutor = JSON.parse(body)
            lerDadosLivros((err, autores) => {
                if(err){
                    response.writeHead(500, {"Content-Type" : "Application/json"});
                    response.end(JSON.stringify({message: "Erro ao ler autores"}));
                    return;
                }
                novoAutor.id = uuidv4();
                autores.push(novoAutor);

                fs.writeFile("livros.json", JSON.stringify(autores, null, 2), (err) => {
                    if(err){
                        response.writeHead(500, {"Content-Type" : "Application/json"});
                        response.end(JSON.stringify({message: "Erro ao cadastrar autores"}));
                        return;
                    }
                    response.writeHead(201, {"Content-Type" : "Application/json"});
                    response.end(JSON.stringify(novoAutor));   
                })
            })
        })       
    }else if(method === "POST" && url === "/editoras"){
        let body = ''
        request.on("data", (chunk) => {
            body += chunk;
        })
        request.on("end", () => {
            const novaEditora = JSON.parse(body)
            lerDadosLivros((err, editoras) => {
                if(err){
                    response.writeHead(500, {"Content-Type" : "Application/json"});
                    response.end(JSON.stringify({message: "Erro ao ler Editora"}));
                    return;
                }
                novaEditora.id = uuidv4();
                editoras.push(novaEditora);

                fs.writeFile("livros.json", JSON.stringify(editoras, null, 2), (err) => {
                    if(err){
                        response.writeHead(500, {"Content-Type" : "Application/json"});
                        response.end(JSON.stringify({message: "Erro ao cadastrar editoras"}));
                        return;
                    }
                    response.writeHead(201, {"Content-type" : "Application/json"});
                    response.end(JSON.stringify(novaEditora));
                    
                })
            })
        })       
        
    }else if(method === "GET" && url === "/livros/{id_livro}"){

    }else if(method === "PUT" && url === "/autores/{id_livro}"){

    }else if(method === "DELETE" && url === "/editoras/{id_livro}"){

    }else if(method === "GET" && url === "/editoras"){
        lerDadosLivros((err, editoras) => {
            if(err){
                response.writeHead(500, {"Content-Type" : "Application/json"});
                response.end(JSON.stringify({message: "Erro ao ler editoras"}));
                return;
            }

            response.writeHead(200, {"Content-Type" : "Application/json"});
            response.end(JSON.stringify(editoras));
            return;
        })

    }
})

server.listen(PORT, () => {
    console.log(`Servidor on port http://localhost:${PORT}`);
})