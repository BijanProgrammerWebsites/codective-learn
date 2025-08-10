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
    {
      category: "fill-in-the-blank",
      title: "Fill in the blank",
      textBefore: "The HTML element used to create a hyperlink is ",
      textAfter: ".",
      correctAnswers: ["a", "anchor", "<a>", "<a></a>"],
    },
    {
      category: "true-false",
      title: "True or False",
      items: [
        { text: "The <div> element is an inline element by default.", answer: false },
        { text: "CSS stands for Cascading Style Sheets.", answer: true },
        { text: "The <span> element is a block-level element by default.", answer: false },
      ],
    },
  ],
};
