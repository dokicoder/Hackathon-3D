import { useWoundDocStore } from '../store';
import { Typography } from '@mui/material';
import { getLocationFromBodyPart } from '../utils';
import Divider from '@mui/material/Divider';

export const BottomBar = (): JSX.Element => {
  const { hoveredBodyPart } = useWoundDocStore();

  return (
    <div className="body-part-container">
      <Divider
        sx={{
          marginBottom: '10px',
        }}
      />
      <Typography fontSize="1rem" sx={{ whiteSpace: 'nowrap' }}>
        {getLocationFromBodyPart(hoveredBodyPart)}
      </Typography>
    </div>
  );
};
