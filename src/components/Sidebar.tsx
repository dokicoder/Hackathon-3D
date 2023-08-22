import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import FilterableTreeView from './FilterableTreeView';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Wound } from '../AppContainer';

export const SideBar = ({
  wound,
  saveWound,
}: {
  wound: Wound;
  saveWound: (wound: Wound) => void;
}): JSX.Element => {
  const [selectedWoundType, setSelectedWoundType] = useState<string>(
    wound.woundType
  );

  const onSaveHandler = (): void => {
    saveWound({
      woundType: selectedWoundType,
      createDate: new Date(),
    });
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography fontSize="1.5em" marginTop="16px" marginBottom="24px">
          Wunde hinzufügen
        </Typography>
        <FilterableTreeView onItemSelected={setSelectedWoundType} />
        <p>Selected wound type: {selectedWoundType}</p>
        <Button onClick={() => onSaveHandler()}>Speichern</Button>
      </CardContent>
    </Card>
  );
};
