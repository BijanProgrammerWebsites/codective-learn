import { QuizType } from "@/types/quiz.type";

export const quiz1: QuizType = {
  chapters: [
    {
      icon: "/assets/logo/vscode.svg",
      title: "Development Environment Setup",
      tag: "development-environment-setup",
    },
    {
      icon: "/assets/logo/javascript.svg",
      title: "JavaScript as a Programming Language",
      tag: "javascript-as-a-programming-language",
    },
    {
      icon: "/assets/logo/html.svg",
      title: "Developing Static Pages - HTML Fundamentals",
      tag: "developing-static-pages",
    },
    {
      icon: "/assets/logo/css.svg",
      title: "Developing Static Pages - CSS Fundamentals",
      tag: "developing-static-pages",
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
      items: [
        {
          text: "The <div> element is an inline element by default.",
          answer: false,
        },
        { text: "CSS stands for Cascading Style Sheets.", answer: true },
        {
          text: "The <span> element is a block-level element by default.",
          answer: false,
        },
      ],
    },
    {
      category: "matching",
      prompts: [
        { id: "prompt-1", text: "HTML" },
        { id: "prompt-2", text: "CSS" },
        { id: "prompt-3", text: "JavaScript" },
      ],
      responses: [
        { id: "response-1", text: "Structure" },
        { id: "response-2", text: "Style" },
        { id: "response-3", text: "Interactivity" },
      ],
    },
  ],
};
