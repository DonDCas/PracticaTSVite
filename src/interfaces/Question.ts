export interface Question {
    type:              TypeKind;
    difficulty:        Difficulty;
    category:          string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export const Difficulty = {
    Easy: "easy",
    Hard: "hard",
    Medium: "medium",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const TypeKind = {
    Boolean: "boolean",
    Multiple: "multiple",
} as const;

export type TypeKind = (typeof TypeKind)[keyof typeof TypeKind];

export interface Categoria {
    id:   number;
    name: string;
}
