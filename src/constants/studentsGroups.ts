import { TFunction } from 'next-i18next';

export interface StudentGroupOption {
  id: string;
  value: string;
  label: string;
}
export interface StudentGroup {
  id: string;
  label: string;
  options: StudentGroupOption[];
}

export const getStudentsGroups = (t: TFunction): StudentGroup[] => [
  {
    id: 'age-groups',
    label: t('groups:age-groups'),
    options: [
      {
        id: '5-11',
        value: '5-11',
        label: '5-11',
      },
      {
        id: '11-14',
        value: '11-14',
        label: '11-14',
      },
      {
        id: '14-18',
        value: '14-18',
        label: '14-18',
      },
      {
        id: '18-22',
        value: '18-22',
        label: '18-22',
      },
      {
        id: '22+',
        value: '22+',
        label: '22+',
      },
    ],
  },
  {
    id: 'performance-based-groups',
    label: t('groups:performance-based-groups'),
    options: [
      {
        id: 'high-achievers',
        value: 'high-achievers',
        label: t('groups:performance.high-achievers'),
      },
      {
        id: 'average-performers',
        value: 'average-performers',
        label: t('groups:performance.average-performers'),
      },
      {
        id: 'needs-improvement',
        value: 'needs-improvement',
        label: t('groups:performance.needs-improvement'),
      },
      {
        id: 'top-performers',
        value: 'top-performers',
        label: t('groups:performance.top-performers'),
      },
      {
        id: 'struggling-students',
        value: 'struggling-students',
        label: t('groups:performance.struggling-students'),
      },
    ],
  },
  {
    id: 'participation-and-engagement-groups',
    label: t('groups:participation-and-engagement-groups'),
    options: [
      {
        id: 'active-participants',
        value: 'active-participants',
        label: t('groups:participation.active-participants'),
      },
      {
        id: 'occasional-contributors',
        value: 'occasional-contributors',
        label: t('groups:participation.occasional-contributors'),
      },
      {
        id: 'silent-observers',
        value: 'silent-observers',
        label: t('groups:participation.silent-observers'),
      },
      {
        id: 'frequent-absentees',
        value: 'frequent-absentees',
        label: t('groups:participation.frequent-absentees'),
      },
    ],
  },
  {
    id: 'special-needs-and-support-groups',
    label: t('groups:special-needs-and-support-groups'),
    options: [
      {
        id: 'special-education-needs',
        value: 'special-education-needs',
        label: t('groups:special-needs.special-education-needs'),
      },
      {
        id: 'english-language-learners',
        value: 'english-language-learners',
        label: t('groups:special-needs.english-language-learners'),
      },
      {
        id: 'support-needed',
        value: 'support-needed',
        label: t('groups:special-needs.support-needed'),
      },
    ],
  },
];
