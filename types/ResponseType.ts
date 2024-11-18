import { Key } from "react";
import { QuestionT } from "./QuestionType";

export interface ResponseT {
    id: Key;
    formId: Key;
    responses: QuestionT[];
    submittedAt: string;
} 