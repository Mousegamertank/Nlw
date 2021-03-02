import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UsersRespository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";


class SendMailController {
    
    async execute(request: Request, response: Response){
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

        const userAlreadyExist = await usersRepository.findOne({ email });

        if (!userAlreadyExist) {
            return response.status(400).json({
                error: "User does not exist!",
            })
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            return response.status(400).json({
                error: "Survey does nor exists!"
            })
        }

        
        const variabled = {
            name: userAlreadyExist.name,
            title: survey.title,
            description: survey.description,
            user_id: userAlreadyExist.id,
            link: process.env.URL_MAIL, 
            
        }
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs"); 
        
        const surveyUserAlreadyExists = await surveysRepository.findOne({
            where: [{user_id: userAlreadyExist.id}, {value: null}]
        });
        
        if (surveyUserAlreadyExists){
            await SendMailService.execute(email, survey.title, variabled, npsPath);
            return response.json(surveyUserAlreadyExists);
        }
        
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExist.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);


        await SendMailService.execute(email, survey.title, variabled, npsPath);

        return response.json(surveyUser);
    }
}

export { SendMailController }