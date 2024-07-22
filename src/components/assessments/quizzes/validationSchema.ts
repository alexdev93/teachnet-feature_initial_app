import { TFunction } from 'next-i18next';
import * as Yup from 'yup';

export const getQuizValidationSchema = (t: TFunction) => {
  const quizValidationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    timeLimit: Yup.number()
      .positive('Time limit must be positive')
      .required('Time limit is required'),
    successPercentage: Yup.number().min(1).max(100).required('Success percentage is required'),
    description: Yup.string(),
    // Tags are array of objects with id, value and label
    tags: Yup.array().of(
      Yup.object({
        id: Yup.string(),
        value: Yup.string(),
        label: Yup.string(),
      }),
    ),
    useAI: Yup.boolean(),
    numQuestions: Yup.number()
      .positive('Number of questions must be positive')
      .required('Number of questions is required'),
    difficulty: Yup.string().oneOf(['easy', 'medium', 'hard'], 'Invalid difficulty level'),
    questionTypes: Yup.object({
      multipleChoice: Yup.boolean(),
      trueFalse: Yup.boolean(),
      shortAnswer: Yup.boolean(),
      fillInTheBlank: Yup.boolean(),
      matching: Yup.boolean(),
    }),
    strictMode: Yup.boolean(),
    focusAreas: Yup.array().of(Yup.string()),
    questionFormat: Yup.string().oneOf(
      ['short', 'detailed', 'scenario'],
      'Invalid question format',
    ),
  });

  return quizValidationSchema;
};
