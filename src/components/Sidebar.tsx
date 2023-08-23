import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import FilterableTreeView from './FilterableTreeView';
import { useState } from 'react';
import {
  CardActions,
  Slide,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useWoundDocStore } from '../store';
import { getLocationFromBodyPart } from '../utils';

const CssTextField = styled(TextField)({
  '& .MuiInput-root:before': {
    borderBottomColor: 'transparent',
  },
});

export const SideBar = (): JSX.Element => {
  const { selectedWound, selectWound, updateWound } = useWoundDocStore();

  const [selectedWoundType, setSelectedWoundType] = useState<
    string | undefined
  >(selectedWound?.woundType);

  const onSaveHandler = (): void => {
    selectedWound &&
      updateWound({
        ...selectedWound,
        woundType: selectedWoundType,
        createDate: selectedWound.createDate ?? new Date(),
      });
    selectWound(undefined);
  };

  const onAbortHandler = (): void => {
    selectWound(undefined);
  };

  return (
    <Slide in={!!selectedWound} direction="left">
      <Card
        sx={{
          width: 400,
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100vh',
          isolation: 'isolate',
        }}
      >
        <CardContent>
          <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
            Körperlokation
          </Typography>
          <CssTextField
            fullWidth
            id="filled-basic"
            variant="standard"
            value={getLocationFromBodyPart(
              selectedWound?.bodyPart,
              'Unspezifiziert'
            )}
          />

          <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
          <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
            Wundtyp
          </Typography>
          <FilterableTreeView
            onItemSelected={setSelectedWoundType}
            selectedItem={selectedWoundType}
          />
          {selectedWoundType && (
            <p>
              Ausgewählter Wundtype:{' '}
              <span style={{ fontWeight: 'bold' }}>{selectedWoundType}</span>
            </p>
          )}
          <Typography marginTop="16px" marginBottom="8px">
            Zeitpunkt des ersten Auftritts der Wunde
          </Typography>
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />

          <Typography marginTop="16px" marginBottom="8px">
            Bemerkung
          </Typography>
          <TextField multiline fullWidth />
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={onSaveHandler}>
            Speichern
          </Button>
          <Button onClick={onAbortHandler}>Abbrechen</Button>
        </CardActions>
      </Card>
    </Slide>
  );
};
