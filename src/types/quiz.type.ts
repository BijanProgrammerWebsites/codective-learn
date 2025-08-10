import type { ReactNode } from "react";

export type QuizType = {
  chapters: QuizChapter[];
  questions: QuestionType[];
};

export type QuizChapter = {
  icon: string;
  title: string;
};

export type MultipleChoiceQuestionType = {
  category: "multiple-choice";
  title: ReactNode;
  choices: ReactNode[];
  correctChoiceIndex: number;
};

export type FillInTheBlankQuestionType = {
  category: "fill-in-the-blank";
  title: ReactNode;
  textBefore: ReactNode;
  textAfter: ReactNode;
  correctAnswers: string[];
};

export type TrueFalseItem = {
  text: ReactNode;
  answer: boolean;
};

export type TrueFalseQuestionType = {
  category: "true-false";
  title: ReactNode;
  items: TrueFalseItem[];
};

export type MatchingPairItem = {
  id: string;
  text: ReactNode;
};

export type MatchingQuestionType = {
  category: "matching";
  title: ReactNode;
  left: MatchingPairItem[];
  right: MatchingPairItem[];
};

type QuestionType =
  | MultipleChoiceQuestionType
  | FillInTheBlankQuestionType
  | TrueFalseQuestionType
  | MatchingQuestionType;
