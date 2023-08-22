import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import FilterableTreeView from './FilterableTreeView';
import { useState } from 'react';
import { TextField, Typography, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useWoundDocStore } from '../store';

const CssTextField = styled(TextField)({
  '& .MuiInput-root:before': {
    borderBottomColor: 'transparent',
  },
});

const getLocationFromBodyPart = (bodyPart?: string) =>
  ({
    hand_left: 'Linke Hand',
    hand_right: 'Rechte Hand',
    foot_left: 'Linker Fuss',
    foot_right: 'Rechter Fuss',
    face_front: 'Gesicht',
  }[bodyPart as string] || 'Unspezifiziert');

export const SideBar = (): JSX.Element => {
  const { selectedWound, selectedWoundIdx, updateWound } = useWoundDocStore();

  const [selectedWoundType, setSelectedWoundType] = useState<string>(
    selectedWound?.woundType || ''
  );

  const onSaveHandler = (): void => {
    selectedWound &&
      selectedWoundIdx &&
      updateWound(
        {
          ...selectedWound,
          woundType: selectedWoundType,
          createDate: new Date(),
        },
        selectedWoundIdx
      );
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
          Körperlokation
        </Typography>
        <CssTextField
          id="filled-basic"
          variant="standard"
          value={getLocationFromBodyPart(selectedWound?.bodyPart)}
        />

        <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
        <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
          Wundtyp
        </Typography>
        <FilterableTreeView onItemSelected={setSelectedWoundType} />
        {selectedWoundType && <p>Ausgewählter Wundtype: {selectedWoundType}</p>}

        <Typography marginTop="8px" marginBottom="8px">
          Zeitpunkt des ersten Auftritts der Wunde
        </Typography>
        <DatePicker />
        <div>
          <Button onClick={() => onSaveHandler()}>Speichern</Button>
        </div>
      </CardContent>
    </Card>
  );
};
