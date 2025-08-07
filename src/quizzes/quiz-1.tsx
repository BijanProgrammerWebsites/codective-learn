import { QuizType } from "@/types/quiz.type";

export const quiz1: QuizType = {
  chapters: [
    {
      icon: "/assets/logo/vscode.svg",
      title: "Development Environment Setup",
    },
    {
      icon: "/assets/logo/javascript.svg",
      title: "JavaScript as a Programming Language",
    },
    {
      icon: "/assets/logo/html.svg",
      title: "Developing Static Pages - HTML Fundamentals",
    },
    {
      icon: "/assets/logo/css.svg",
      title: "Developing Static Pages - CSS Fundamentals",
    },
  ],
  questions: [
    {
      category: "multiple-choice",
      title: "Which data type is the better choice to store a phone number?",
      choices: ["text", "number", "string", "tel"],
      correctChoiceIndex: 2,
    },
  ],
};
