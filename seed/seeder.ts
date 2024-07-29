import 'dotenv/config';

import { UserService } from '../src/services';
import { RoleService } from '../src/services';
import { QuestionService } from '../src/services';
import { QuestionTypeService } from '../src/services';
import { QuestionnaireService } from '../src/services';
import { QuestionnaireTypeService } from '../src/services';
import { ChoiceService } from '../src/services';
import { QuestionnaireQuestionService } from '../src/services';
import { ServiceFactory } from '../src/services/ServiceFactory';
import seedData from './seed';
import {connect} from "../src/server/database";

async function seed() {
    connect().then(async _r => {
        const serviceFactory = new ServiceFactory();

        const userService = new UserService(serviceFactory);
        const roleService = new RoleService(serviceFactory);
        const questionService = new QuestionService(serviceFactory);
        const questionTypeService = new QuestionTypeService(serviceFactory);
        const questionnaireService = new QuestionnaireService(serviceFactory);
        const questionnaireTypeService = new QuestionnaireTypeService(serviceFactory);
        const choiceService = new ChoiceService(serviceFactory);
        const questionnaireQuestionService = new QuestionnaireQuestionService(serviceFactory);

        // Create Roles
        const roles = await Promise.all(seedData.roles.map(role => roleService.create(role)));

        // Create Users
        const users = [];
        for (const roleData of seedData.roles) {
            for (const userData of roleData.users) {
                const role = roles.find(r => r.name === roleData.name);
                const user = await userService.create({ ...userData, role });
                users.push(user);
            }
        }

        // Create Question Types
        const questionTypes = await Promise.all(seedData.questionTypes.map(qt => questionTypeService.create(qt)));

        // Create Questions and Choices
        const questions = [];
        for (const questionData of seedData.questions) {
            const questionType = questionTypes.find(qt => qt.name === questionData.question_type);
            const createdBy = users.find(u => u.username === questionData.created_by);
            const question = await questionService.create({ ...questionData, question_type: questionType, created_by: createdBy });
            questions.push(question);

            await Promise.all(questionData.choices.map(choiceData => choiceService.create({ ...choiceData, question })));
        }

        // Create Questionnaire Types
        const questionnaireTypes = await Promise.all(seedData.questionnaireTypes.map(qt => questionnaireTypeService.create(qt)));

        // Create Questionnaires and QuestionnaireQuestions
        for (const questionnaireData of seedData.questionnaires) {
            const questionnaireType = questionnaireTypes.find(qt => qt.name === questionnaireData.type);
            const createdBy = users.find(u => u.username === questionnaireData.created_by);
            const questionnaire = await questionnaireService.create({ ...questionnaireData, type: questionnaireType, created_by: createdBy });

            await Promise.all(questionnaireData.questions.map(questionText => {
                const question = questions.find(q => q.question_text === questionText);
                return questionnaireQuestionService.create({ questionnaire, question });
            }));
        }
    });
}

seed().then(() => {
    console.log('Seeding completed successfully.');
}).catch((error) => {
    console.error('Seeding failed:', error);
});
