export interface UploadedFile extends File {
  id: string;
}

interface Tag {
  id: string;
  value: string;
  label: string;
}

export interface QuizFormValues {
  title: string;
  timeLimit: string;
  successPercentage: string;
  description: string;
  useAI: boolean;
  uploadedFiles: UploadedFile[];
  tags: Tag[];
  AISettings: {
    numQuestions: number;
    difficulty: string;
    questionTypes: {
      multipleChoice: boolean;
      trueFalse: boolean;
      fillInTheBlank: boolean;
    };
    strictMode: boolean;
    focusAreas: string[];
    questionFormat: string;
  };
}
