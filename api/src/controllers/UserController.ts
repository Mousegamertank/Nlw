import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRespository";

class UserController {
    async create(request: Request, response: Response) {
        // const body = request.body;
        // console.log(body);
        // return response.send();

        const { name, email } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        //SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExist = await userRepository.findOne({
            email
        })

        if (userAlreadyExist){
            return response.status(400).json({
                error: "User Already exists!",
            });
        }

        const user = userRepository.create({
         name, 
         email
        });

        await userRepository.save(user);
       
        return response.json(user);
       
    }
}

export { UserController };
