export interface IFeedbackTheme {
    id: number;
    nameEng: string;
    nameRus: string;
    isActive: true;
    createdAt: Date;
}

export interface IFeedback {
    message: string;
    email: string;
    feedbackCategory: IFeedbackTheme;
    userId?: number;
}
