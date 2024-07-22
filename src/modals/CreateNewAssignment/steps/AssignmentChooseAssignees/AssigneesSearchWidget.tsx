import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchInput from 'src/components/common/SearchInput';
import AdvancedDropdown, { Option } from 'src/components/common/AdvancedDropdown';
import { getStudentsGroups } from 'src/constants/studentsGroups';
import { TFunction, useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';

interface SelectedGroup {
  id: string;
  label: string;
  options: Option[];
}

function AddAllButton({
  t,
  onClick,
}: {
  t: TFunction;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      loading={false}
      variant='contained'
      fullWidth
      sx={{ marginBottom: 2 }}
      onClick={onClick}
    >
      {t('assignments:addAll')}
    </Button>
  );
}
function RemoveAllButton({
  t,
  onClick,
}: {
  t: TFunction;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button loading={false} variant='outlined' fullWidth sx={{ marginBottom: 2 }} onClick={onClick}>
      {t('assignments:removeAll')}
    </Button>
  );
}
function AddAllFilteredButton({
  t,
  onClick,
}: {
  t: TFunction;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      loading={false}
      variant='contained'
      fullWidth
      sx={{ marginBottom: 2 }}
      onClick={onClick}
    >
      {t('assignments:addAllFiltered')}
    </Button>
  );
}

export default function AssigneesSearchWidget() {
  const { t } = useTranslation();

  const studentGroups = getStudentsGroups(t);

  const [allStudentsAdded, setAllStudentsAdded] = useState(false);
  const [isFilterView, setIsFilterView] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<SelectedGroup[]>([]);
  console.info('selectedGroups: ', selectedGroups);

  const handleSetGroups = (selectedGroupOptions: Option[]) => {
    // Find the group id that the selected group options belong to
    const selectedGroupId = studentGroups.find(group =>
      group.options.some(option => selectedGroupOptions.includes(option)),
    )?.id;
    console.info('selectedGroupId: ', selectedGroupId);

    if (!selectedGroupId) return;

    // TODO: Implement logic to update selectedGroups state
    setSelectedGroups([]);
  };

  const handlePrimaryButtonClick = () => {
    // TODO: Implement. This is demo logic for now.
    if (isFilterView) {
      setIsFilterView(false);

      return;
    }

    setAllStudentsAdded(!allStudentsAdded);
  };

  const renderPrimaryButton = () => {
    if (isFilterView) {
      return <AddAllFilteredButton t={t} onClick={handlePrimaryButtonClick} />;
    }

    return allStudentsAdded ? (
      <RemoveAllButton t={t} onClick={handlePrimaryButtonClick} />
    ) : (
      <AddAllButton t={t} onClick={handlePrimaryButtonClick} />
    );
  };

  return (
    <Box
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        borderRadius: 1,
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      })}
    >
      {isFilterView ? (
        <Box>
          <Grid container spacing={1}>
            {studentGroups.map(group => (
              <Grid item xs={12} key={group.id}>
                <AdvancedDropdown
                  withChips
                  id={group.id}
                  label={group.label}
                  onChange={(e, value) => {
                    handleSetGroups(value as Option[]);
                  }}
                  defaultOptions={group.options}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <SearchInput
            fullWidth
            variant='outlined'
            placeholder='Search for students'
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant='outlined'
            fullWidth
            sx={{ marginBottom: 2 }}
            onClick={() => setIsFilterView(true)}
          >
            {t('assignments:chooseFilters')}
          </Button>
        </Box>
      )}

      {renderPrimaryButton()}
    </Box>
  );
}
