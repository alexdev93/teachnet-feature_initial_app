import { TFunction } from 'next-i18next';
import ClassAssignments from 'src/components/class/tabs/Assignments';
import Assessments from 'src/components/class/tabs/Assessments';
import ClassResources from 'src/components/class/tabs/Resources';
import ClassStream from 'src/components/class/tabs/Stream';

export enum ClassTab {
  Stream = 'stream',
  Assignments = 'assignments',
  Assessments = 'assessments',
  Resources = 'resources',
  People = 'people',
  Grades = 'grades',
  Settings = 'settings',
}

export const getClassTabs = (t: TFunction) => [
  {
    id: ClassTab.Stream,
    label: t('classes:tabTitles.stream'),
    component: <ClassStream />,
  },
  {
    id: ClassTab.Assessments,
    label: t('classes:tabTitles.assessments'),
    component: <Assessments />,
  },
  {
    id: ClassTab.Assignments,
    label: t('common:assignments'),
    component: <ClassAssignments />,
  },
  {
    id: ClassTab.Resources,
    label: t('classes:tabTitles.resources'),
    component: <ClassResources />,
  },
  {
    id: ClassTab.People,
    label: t('classes:tabTitles.people'),
    component: <div>People</div>,
  },
  {
    id: ClassTab.Grades,
    label: t('classes:tabTitles.grades'),
    component: <div>Grades</div>,
  },
  {
    id: ClassTab.Settings,
    label: t('common:settings'),
    component: <div>Settings</div>,
  },
];
