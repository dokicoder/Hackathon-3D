import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import FilterableTreeView from './FilterableTreeView';
import { useEffect, useState } from 'react';
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
import FileUploadMultiple from './FileUpload';
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

  const [selectedWoundPictures, setSelectedWoundPictures] = useState<string[]>(
    selectedWound?.appendedPictures || []
  );

  useEffect(() => {
    setSelectedWoundPictures([]);
  }, [selectedWound]);

  const onSaveHandler = (): void => {
    console.log({
      ...selectedWound,
      woundType: selectedWoundType,
      createDate: new Date(),
      appendedPictures: [...selectedWoundPictures],
    });

    selectedWound &&
      updateWound({
        ...selectedWound,
        woundType: selectedWoundType,
        createDate: selectedWound.createDate ?? new Date(),
        appendedPictures: [...selectedWoundPictures],
      });

    selectWound(undefined);
  };

  console.log({
    selectedWoundPictures,
    appendedPictures: selectedWound?.appendedPictures,
  });

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

          <Divider sx={{ marginTop: '12px', marginBottom: '12px' }} />
          <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
            Wundtyp
          </Typography>
          <FilterableTreeView
            onItemSelected={setSelectedWoundType}
            selectedItem={selectedWoundType}
          />
          {selectedWoundType && (
            <p>
              Ausgewählter Wundtyp:{' '}
              <span style={{ fontWeight: 'bold' }}>{selectedWoundType}</span>
            </p>
          )}
          <Typography marginTop="16px" marginBottom="8px">
            Zeitpunkt des ersten Auftritts der Wunde
          </Typography>
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />
          <FileUploadMultiple
            woundPictures={
              !selectedWoundPictures?.length &&
              selectedWound?.appendedPictures.length
                ? selectedWound.appendedPictures
                : selectedWoundPictures
            }
            setWoundPictures={setSelectedWoundPictures}
          />
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
