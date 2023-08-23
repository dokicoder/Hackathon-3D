import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import { useWoundDocStore } from '../store';
import { useEffect } from 'react';
import { Fade, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import IconButton from '@mui/material/IconButton';

export const ToolBar = (): JSX.Element => {
  const {
    gender,
    markerPreviewSize,
    selectedWound,
    setMarkerPreviewSize,
    setGender,
    setShowResizePreview,
  } = useWoundDocStore();

  useEffect(() => {
    if (selectedWound) {
      setMarkerPreviewSize(selectedWound.size);
    }
  }, [selectedWound]);

  return (
    <Fade in={!selectedWound}>
      <Card
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          overflow: 'visible',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Typography fontSize="1rem" sx={{ whiteSpace: 'nowrap' }}>
            Model:
          </Typography>
          <IconButton
            color="primary"
            aria-label="add an alarm"
            onClick={(event) =>
              setGender(gender === 'male' ? 'female' : 'male')
            }
          >
            {gender === 'female' ? <FemaleIcon /> : <MaleIcon />}
          </IconButton>
          <Typography fontSize="1rem" sx={{ whiteSpace: 'nowrap' }}>
            Marker Size: {markerPreviewSize.toFixed(0)}
          </Typography>
          <Slider
            aria-label="Default"
            valueLabelDisplay="auto"
            size="small"
            min={20}
            max={100}
            value={markerPreviewSize}
            onChange={(_, newValue) => {
              setShowResizePreview(true);
              setMarkerPreviewSize(newValue as number);
            }}
            onChangeCommitted={() => {
              setShowResizePreview(false);
            }}
          />
        </CardContent>
      </Card>
    </Fade>
  );
};
