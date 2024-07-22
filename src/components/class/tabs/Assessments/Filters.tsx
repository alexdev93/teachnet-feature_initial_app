import { useTranslation } from 'next-i18next';
import Dropdown, { Option } from 'src/components/common/Dropdown';

export function AssessmentTypeFilter({ onChange }: { onChange: (option: Option) => void }) {
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
      label: t('classes:assessments.homework'),
    },
    {
      id: 'quiz',
      value: 'quiz',
      label: t('classes:assessments.quiz'),
    },
  ];

  return (
    <Dropdown
      id='assessment-type'
      label={t('classes:assessments.type')}
      options={options}
      onChange={onChange}
    />
  );
}
