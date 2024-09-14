"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createDynamicRoutes_1 = require("../../utils/createDynamicRoutes");
const User_1 = require("../../models/User");
const Role_1 = require("../../models/Role");
const ActiveSession_1 = require("../../models/ActiveSession");
const Choice_1 = require("../../models/Choice");
const Question_1 = require("../../models/Question");
const Questionnaire_1 = require("../../models/Questionnaire");
const QuestionnaireQuestion_1 = require("../../models/QuestionnaireQuestion");
const QuestionnaireType_1 = require("../../models/QuestionnaireType");
const QuestionType_1 = require("../../models/QuestionType");
const Setting_1 = require("../../models/Setting");
const Ticket_1 = require("../../models/Ticket");
const UserQuestion_1 = require("../../models/UserQuestion");
const UserQuestionnaire_1 = require("../../models/UserQuestionnaire");
const services_1 = require("../../services");
const services_2 = require("../../services");
const services_3 = require("../../services");
const services_4 = require("../../services");
const services_5 = require("../../services");
const services_6 = require("../../services");
const services_7 = require("../../services");
const services_8 = require("../../services");
const services_9 = require("../../services");
const services_10 = require("../../services");
const services_11 = require("../../services");
const services_12 = require("../../services");
const services_13 = require("../../services");
const ServiceFactory_1 = require("../../services/ServiceFactory");
const express_validator_1 = require("express-validator");
const express_1 = __importDefault(require("express"));
const mapAndCreateEndpoints = () => {
    // Initialize services
    const services = {
        User: new services_1.UserService(new ServiceFactory_1.ServiceFactory()),
        Role: new services_2.RoleService(new ServiceFactory_1.ServiceFactory()),
        ActiveSession: new services_3.ActiveSessionService(new ServiceFactory_1.ServiceFactory()),
        Choice: new services_4.ChoiceService(new ServiceFactory_1.ServiceFactory()),
        Question: new services_5.QuestionService(new ServiceFactory_1.ServiceFactory()),
        Questionnaire: new services_6.QuestionnaireService(new ServiceFactory_1.ServiceFactory()),
        QuestionnaireQuestion: new services_7.QuestionnaireQuestionService(new ServiceFactory_1.ServiceFactory()),
        QuestionnaireType: new services_8.QuestionnaireTypeService(new ServiceFactory_1.ServiceFactory()),
        QuestionType: new services_9.QuestionTypeService(new ServiceFactory_1.ServiceFactory()),
        Setting: new services_10.SettingService(new ServiceFactory_1.ServiceFactory()),
        Ticket: new services_11.TicketService(new ServiceFactory_1.ServiceFactory()),
        UserQuestion: new services_12.UserQuestionService(new ServiceFactory_1.ServiceFactory()),
        UserQuestionnaire: new services_13.UserQuestionnaireService(new ServiceFactory_1.ServiceFactory())
    };
    // Define entities
    const entities = [
        User_1.User,
        Role_1.Role,
        ActiveSession_1.ActiveSession,
        Choice_1.Choice,
        Question_1.Question,
        Questionnaire_1.Questionnaire,
        QuestionnaireQuestion_1.QuestionnaireQuestion,
        QuestionnaireType_1.QuestionnaireType,
        QuestionType_1.QuestionType,
        Setting_1.Setting,
        Ticket_1.Ticket,
        UserQuestion_1.UserQuestion,
        UserQuestionnaire_1.UserQuestionnaire
    ];
    // Define controller overrides
    const overrides = {
        User: {
            async create(req, res) {
                const result = await services.User.create(req.body);
                res.status(201).json({ success: true, data: result });
            }
        },
        Role: {
            async update(req, res) {
                const result = await services.Role.update(req.params.id, req.body);
                res.status(200).json({ success: true, data: result });
            }
        }
    };
    // Define validation rules
    const validationRules = {
        User: {
            create: [(0, express_validator_1.body)('username').isString(), (0, express_validator_1.body)('email').isEmail()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('username').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        Role: {
            create: [(0, express_validator_1.body)('name').isString()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('name').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        ActiveSession: {
            create: [(0, express_validator_1.body)('token').isString(), (0, express_validator_1.body)('userId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('token').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        Choice: {
            create: [(0, express_validator_1.body)('choice_text').isString(), (0, express_validator_1.body)('questionId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('choice_text').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        Question: {
            create: [(0, express_validator_1.body)('question_text').isString(), (0, express_validator_1.body)('question_typeId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('question_text').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        Questionnaire: {
            create: [(0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('typeId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('name').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        QuestionnaireQuestion: {
            create: [(0, express_validator_1.body)('questionnaireId').isInt(), (0, express_validator_1.body)('questionId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        QuestionnaireType: {
            create: [(0, express_validator_1.body)('name').isString()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('name').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        QuestionType: {
            create: [(0, express_validator_1.body)('name').isString()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt(), (0, express_validator_1.body)('name').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        Setting: {
            create: [(0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('value').isString()],
            read: [(0, express_validator_1.param)('id').isUUID()],
            update: [(0, express_validator_1.param)('id').isUUID(), (0, express_validator_1.body)('name').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isUUID()],
            list: []
        },
        Ticket: {
            create: [(0, express_validator_1.body)('message').isString()],
            read: [(0, express_validator_1.param)('id').isUUID()],
            update: [(0, express_validator_1.param)('id').isUUID(), (0, express_validator_1.body)('message').optional().isString()],
            delete: [(0, express_validator_1.param)('id').isUUID()],
            list: []
        },
        UserQuestion: {
            create: [(0, express_validator_1.body)('userId').isInt(), (0, express_validator_1.body)('questionId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        },
        UserQuestionnaire: {
            create: [(0, express_validator_1.body)('userId').isInt(), (0, express_validator_1.body)('questionnaireId').isInt()],
            read: [(0, express_validator_1.param)('id').isInt()],
            update: [(0, express_validator_1.param)('id').isInt()],
            delete: [(0, express_validator_1.param)('id').isInt()],
            list: []
        }
    };
    const app = (0, express_1.default)();
    const dynamicRoutes = (0, createDynamicRoutes_1.createDynamicRoutes)(entities, services, overrides, validationRules);
    app.use(express_1.default.json());
    app.use('/admin', dynamicRoutes);
    return app;
};
exports.default = mapAndCreateEndpoints;
//# sourceMappingURL=index.js.map