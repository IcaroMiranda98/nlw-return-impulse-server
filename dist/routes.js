"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedback_repository_1 = require("./repositories/prisma/prisma-feedback-repository");
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
exports.routes = express_1.default.Router();
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "4846707462c652",
        pass: "e2fedaeac66780"
    }
});
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedback_repository_1.PrismaFeedbackRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackUseCase = new submit_feedback_use_case_1.SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
});
