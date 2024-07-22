export interface Assignment {
  title: string;
  description: string;
  type: 'homework' | 'quiz';
  passingGrade: number;
  avgClassGrade: number;
  class: {
    size: number;
  };
  assignees: {
    totalCount: number;
  };
  status: 'inProgress' | 'ended';
}
