import Card from '@mui/material/Card';
import { IWoundState, useWoundDocStore } from '../store';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Html } from '@react-three/drei';
import { getLocationFromBodyPart } from '../utils';

export const Label = ({ wound }: { wound: IWoundState }) => {
  const { selectWound } = useWoundDocStore();

  if (wound.woundType === undefined) {
    return <></>;
  }
  return (
    <Html
      key={wound.bodyPart}
      position={wound.position}
      zIndexRange={[0, 1]}
      style={{ pointerEvents: 'none' }}
    >
      <div className={wound.position.x < 0 ? 'label left' : 'label right'}>
        <Card
          onClick={() => selectWound(wound.id)}
          elevation={1}
          variant="outlined"
          style={{ pointerEvents: 'all', width: 'max-content' }}
        >
          <CardContent>
            <Typography fontSize="1em">{wound.woundType}</Typography>
            <Typography variant="caption">
              {getLocationFromBodyPart(wound.bodyPart)}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Html>
  );
};
