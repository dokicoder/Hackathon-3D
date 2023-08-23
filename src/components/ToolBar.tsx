import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import { useWoundDocStore } from '../store';
import { useEffect } from 'react';
import { Fade, Typography } from '@mui/material';

export const ToolBar = (): JSX.Element => {
  const {
    markerPreviewSize,
    setMarkerPreviewSize,
    selectedWound,
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
          width: 300,
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
