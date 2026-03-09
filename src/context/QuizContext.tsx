import React, { createContext, useContext, useState, type ReactNode } from "react";

export interface QuizAnswers {
  name: string;
  age: number | null;
  gender: string;
  exercise: string;
  diet: string;
  takesSupplements: string;
  currentSupplements: string[];
}

interface QuizContextType {
  answers: QuizAnswers;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  isComplete: boolean;
  setIsComplete: (complete: boolean) => void;
  resetQuiz: () => void;
}

const defaultAnswers: QuizAnswers = {
  name: "",
  age: null,
  gender: "",
  exercise: "",
  diet: "",
  takesSupplements: "",
  currentSupplements: [],
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = answers.takesSupplements === "No" ? 6 : 7;

  const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const resetQuiz = () => {
    setAnswers(defaultAnswers);
    setCurrentStep(0);
    setIsComplete(false);
  };

  return (
    <QuizContext.Provider
      value={{ answers, setAnswer, currentStep, setCurrentStep, totalSteps, isComplete, setIsComplete, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
