import express from 'express';
import { createDynamicRoutes } from './createDynamicRoutes';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { ActiveSession } from '../models/ActiveSession';
import { Choice } from '../models/Choice';
import { Question } from '../models/Question';
import { Questionnaire } from '../models/Questionnaire';
import { QuestionnaireQuestion } from '../models/QuestionnaireQuestion';
import { QuestionnaireType } from '../models/QuestionnaireType';
import { QuestionType } from '../models/QuestionType';
import { Setting } from '../models/Setting';
import { Ticket } from '../models/Ticket';
import { UserQuestion } from '../models/UserQuestion';
import { UserQuestionnaire } from '../models/UserQuestionnaire';
import { UserService } from '../services/UserService';
import { RoleService } from '../services/RoleService';
import { ActiveSessionService } from '../services/ActiveSessionService';
import { ChoiceService } from '../services/ChoiceService';
import { QuestionService } from '../services/QuestionService';
import { QuestionnaireService } from '../services/QuestionnaireService';
import { QuestionnaireQuestionService } from '../services/QuestionnaireQuestionService';
import { QuestionnaireTypeService } from '../services/QuestionnaireTypeService';
import { QuestionTypeService } from '../services/QuestionTypeService';
import { SettingService } from '../services/SettingService';
import { TicketService } from '../services/TicketService';
import { UserQuestionService } from '../services/UserQuestionService';
import { UserQuestionnaireService } from '../services/UserQuestionnaireService';
import { ServiceFactory } from '../services/ServiceFactory';
import { body, param } from 'express-validator';

// Assuming services have been initialized and provided
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

const overrides = {
    User: {
        async create(req, res) {
            // Custom create logic for User
            const result = await this.service.create(req.body);
            res.status(201).json({ success: true, data: result });
        }
    },
    Role: {
        async update(req, res) {
            // Custom update logic for Role
            const result = await this.service.update(req.params.id, req.body);
            res.status(200).json({ success: true, data: result });
        }
    }
};

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
app.use('/api', dynamicRoutes);

export default app;