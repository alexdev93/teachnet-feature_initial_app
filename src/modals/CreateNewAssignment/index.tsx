import React, { useEffect, useState } from 'react';
import { DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FormikInitialValues } from 'src/modals/CreateNewAssignment/types';
import NewAssignmentFormStep from 'src/modals/CreateNewAssignment/steps/AssignmentForm';
import NewAssignmentChooseAssigneesStep from 'src/modals/CreateNewAssignment/steps/AssignmentChooseAssignees';
import NewAssignmentConfirmationStep from 'src/modals/CreateNewAssignment/steps/AssignmentConfirmation';
import useModalStore from 'src/store/modal';

const AssignmentDialog: React.FC<{ formik: FormikProps<FormikInitialValues> }> = ({ formik }) => {
  const { t } = useTranslation();
  const closeModal = useModalStore(store => store.closeModal);
  const [step, setStep] = useState(0);

  const defaultSteps = [
    {
      id: 'assignment-form',
      Component: NewAssignmentFormStep,
    },
    {
      id: 'assignment-assignees',
      Component: NewAssignmentChooseAssigneesStep,
    },
    {
      id: 'assignment-confirmation',
      Component: NewAssignmentConfirmationStep,
    },
  ];
  const [steps, setSteps] = useState(defaultSteps);
  useEffect(() => {
    if (formik.values.assignMethod === 'manual') {
      setSteps(defaultSteps);
    } else {
      const newSteps = defaultSteps.filter(step => step.id !== 'assignment-assignees');
      setSteps(newSteps);
    }
  }, [formik.values.assignMethod]);

  const StepComponent = steps[step].Component;

  return (
    <>
      <DialogTitle>{t('assignments:createAssignment')}</DialogTitle>
      <DialogContent
        sx={{
          minHeight: '700px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <StepComponent
          formik={formik}
          onNext={() => {
            if (step === steps.length - 1) {
              formik.submitForm();
            } else {
              setStep(step + 1);
            }
          }}
          onPrev={() => {
            if (step !== 0) {
              setStep(step - 1);

              return;
            }

            closeModal();
          }}
        />
      </DialogContent>
    </>
  );
};

const AssignmentDialogWrapper: React.FC = () => {
  const { t } = useTranslation();

  const initialValues: FormikInitialValues = {
    assignmentType: '',
    title: '',
    description: '',
    passingGrade: '',
    dueDate: null,
    dueTime: null,
    assignMethod: 'all',
    assignmentTypeDropdown: null,
    classDropdown: { label: 'UI/UX Design', value: 'ui-ux' },
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(t('common:required')),
    description: Yup.string(),
    passingGrade: Yup.number()
      .required(t('common:required'))
      .min(0, t('assignments:mustBeBetween1And100', { min: 1 }))
      .max(100, t('assignments:mustBeBetween1And100', { max: 100 })),
    dueDate: Yup.date().required(t('common:required')),
    dueTime: Yup.string(),
    assignmentTypeDropdown: Yup.object().nullable().required(t('common:required')),
  });

  const onSubmit = (values: FormikInitialValues) => {
    console.log('Form data', values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {formik => <AssignmentDialog formik={formik} />}
    </Formik>
  );
};

export default AssignmentDialogWrapper;
