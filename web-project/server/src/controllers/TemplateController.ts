import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Template } from "../models/Template";
import { AppException } from '../exceptions/AppException';

class TemplateController {

    // Retorno TODOS os registros
    public async index(request: Request, response: Response) {
       try {
            // Instancio um repositório da classe Template
            const repository = getRepository(Template);

            // Buscar TODOS os templates do banco
            const templates = await repository.find()

            // Retorno a lista de templates
            return response.json(templates);
       } catch (e) {
           const error = e as AppException;
           return response.status(error.code).json(error)
       } 
    }

    // Retorno o template conforme o ID vindo para o request param
    public async show(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Retorno o projeto
            return response.json(found);
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     //Adiciono um template 
     public async create(request: Request, response: Response) {
        try {

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Crio uma instância de Template a partir do JSON que veio por request body
            const template = await repository.save(request.body);

            //Retorno o objeto inserido
            return response.status(201).json(template);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     //Atuaslizo um projeto
     public async update(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Pega os dados que devem ser atualizados
            const novo = request.body;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Atualizo o projeto com os novos dados vindo do request body
            repository.update(found.id, novo);

            //Atualizo o ID do objeto novo
            novo.id = found.id;

            //Retorno o objeto atualizado
            return response.json(novo);

        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        } 
     }

     // Removo o template
     public async remove(request: Request, response: Response) {
        try {
            //Pegar o ID do projeto do request params
            const { id } = request.params;

            //Validar se veio o ID por request params
            if (!id) {
                throw new AppException('Parâmetro ID não informado', 'bad-request-id', 400);
            }

            //Instancio um repositório da classe Template
            const repository = getRepository(Template);

            //Busco o projeto com o ID passado por parametro
            const found = await repository.findOne(id);

            //Se não encontrar, retorna 404
            if (!found) {
                throw new AppException('Recurso não encontrado', 'not-found', 404);
            }

            //Removo o objeto
            repository.delete(found);

            //Retorno o status 204 avisando que foi excluído e não tem retorno
            return response.status(204).json();
        } catch (e) {
            const error = e as AppException;
            return response.status(error.code).json(error)
        }
     }
}

export default new TemplateController();