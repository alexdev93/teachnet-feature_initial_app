import { useTranslation } from 'next-i18next';
import Dropdown, { Option } from 'src/components/common/Dropdown';

export function AssignmentStatusFilter({ onChange }: { onChange: (option: Option) => void }) {
  const { t } = useTranslation();

  const options = [
    {
      id: 'all',
      value: 'all',
      label: t('common:all'),
    },
    {
      id: 'inprogress',
      value: 'inprogress',
      label: t('common:inprogress'),
    },
    {
      id: 'completed',
      value: 'completed',
      label: t('common:completed'),
    },
  ];

  return (
    <Dropdown
      id='assignment-status'
      label={t('classes:assignments.status')}
      options={options}
      onChange={onChange}
    />
  );
}

export function AssignmentTypeFilter({ onChange }: { onChange: (option: Option) => void }) {
  const { t } = useTranslation();

  const options = [
    {
      id: 'all',
      value: 'all',
      label: t('common:all'),
    },
    {
      id: 'homework',
      value: 'homework',
      label: t('classes:assignments.homework'),
    },
    {
      id: 'quiz',
      value: 'quiz',
      label: t('classes:assignments.quiz'),
    },
  ];

  return (
    <Dropdown
      id='assignment-type'
      label={t('classes:assignments.type')}
      options={options}
      onChange={onChange}
    />
  );
}
