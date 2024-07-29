import { createDynamicRoutes } from '../../utils/createDynamicRoutes';
import { User } from '../../models/User';
import { Role } from '../../models/Role';
import { ActiveSession } from '../../models/ActiveSession';
import { Choice } from '../../models/Choice';
import { Question } from '../../models/Question';
import { Questionnaire } from '../../models/Questionnaire';
import { QuestionnaireQuestion } from '../../models/QuestionnaireQuestion';
import { QuestionnaireType } from '../../models/QuestionnaireType';
import { QuestionType } from '../../models/QuestionType';
import { Setting } from '../../models/Setting';
import { Ticket } from '../../models/Ticket';
import { UserQuestion } from '../../models/UserQuestion';
import { UserQuestionnaire } from '../../models/UserQuestionnaire';
import { UserService } from '../../services';
import { RoleService } from '../../services';
import { ActiveSessionService } from '../../services';
import { ChoiceService } from '../../services';
import { QuestionService } from '../../services';
import { QuestionnaireService } from '../../services';
import { QuestionnaireQuestionService } from '../../services';
import { QuestionnaireTypeService } from '../../services';
import { QuestionTypeService } from '../../services';
import { SettingService } from '../../services';
import { TicketService } from '../../services';
import { UserQuestionService } from '../../services';
import { UserQuestionnaireService } from '../../services';
import { ServiceFactory } from '../../services/ServiceFactory';
import { body, param } from 'express-validator';
import express, { Request, Response } from 'express';

const mapAndCreateEndpoints = () => {
    // Initialize services
    const services = {
        User: new UserService(new ServiceFactory()),
        Role: new RoleService(new ServiceFactory()),
        ActiveSession: new ActiveSessionService(new ServiceFactory()),
        Choice: new ChoiceService(new ServiceFactory()),
        Question: new QuestionService(new ServiceFactory()),
        Questionnaire: new QuestionnaireService(new ServiceFactory()),
        QuestionnaireQuestion: new QuestionnaireQuestionService(new ServiceFactory()),
        QuestionnaireType: new QuestionnaireTypeService(new ServiceFactory()),
        QuestionType: new QuestionTypeService(new ServiceFactory()),
        Setting: new SettingService(new ServiceFactory()),
        Ticket: new TicketService(new ServiceFactory()),
        UserQuestion: new UserQuestionService(new ServiceFactory()),
        UserQuestionnaire: new UserQuestionnaireService(new ServiceFactory())
    };

// Define entities
    const entities = [
        User,
        Role,
        ActiveSession,
        Choice,
        Question,
        Questionnaire,
        QuestionnaireQuestion,
        QuestionnaireType,
        QuestionType,
        Setting,
        Ticket,
        UserQuestion,
        UserQuestionnaire
    ];

// Define controller overrides
    const overrides = {
        User: {
            async create(req: Request, res: Response) {
                const result = await services.User.create(req.body);
                res.status(201).json({ success: true, data: result });
            }
        },
        Role: {
            async update(req: Request, res: Response) {
                const result = await services.Role.update(req.params.id, req.body);
                res.status(200).json({ success: true, data: result });
            }
        }
    };

// Define validation rules
    const validationRules = {
        User: {
            create: [body('username').isString(), body('email').isEmail()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('username').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        Role: {
            create: [body('name').isString()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('name').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        ActiveSession: {
            create: [body('token').isString(), body('userId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('token').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        Choice: {
            create: [body('choice_text').isString(), body('questionId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('choice_text').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        Question: {
            create: [body('question_text').isString(), body('question_typeId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('question_text').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        Questionnaire: {
            create: [body('name').isString(), body('typeId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('name').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        QuestionnaireQuestion: {
            create: [body('questionnaireId').isInt(), body('questionId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt()],
            delete: [param('id').isInt()],
            list: []
        },
        QuestionnaireType: {
            create: [body('name').isString()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('name').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        QuestionType: {
            create: [body('name').isString()],
            read: [param('id').isInt()],
            update: [param('id').isInt(), body('name').optional().isString()],
            delete: [param('id').isInt()],
            list: []
        },
        Setting: {
            create: [body('name').isString(), body('value').isString()],
            read: [param('id').isUUID()],
            update: [param('id').isUUID(), body('name').optional().isString()],
            delete: [param('id').isUUID()],
            list: []
        },
        Ticket: {
            create: [body('message').isString()],
            read: [param('id').isUUID()],
            update: [param('id').isUUID(), body('message').optional().isString()],
            delete: [param('id').isUUID()],
            list: []
        },
        UserQuestion: {
            create: [body('userId').isInt(), body('questionId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt()],
            delete: [param('id').isInt()],
            list: []
        },
        UserQuestionnaire: {
            create: [body('userId').isInt(), body('questionnaireId').isInt()],
            read: [param('id').isInt()],
            update: [param('id').isInt()],
            delete: [param('id').isInt()],
            list: []
        }
    };

    const app = express();

    const dynamicRoutes = createDynamicRoutes(entities, services, overrides, validationRules);

    app.use(express.json());
    app.use('/admin', dynamicRoutes);

    return app;
}

export default mapAndCreateEndpoints;