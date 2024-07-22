export interface FormikInitialValues {
  assignmentType: string;
  title: string;
  description: string;
  passingGrade: string;
  dueDate: Date | null;
  dueTime: Date | null;
  assignMethod: string;
  assignmentTypeDropdown: any;
  classDropdown: { label: string; value: string };
}
