import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        const body = request.body;

        const userRepository = getRepository(User);

        return response.send();
    }
}

export{ UserController }