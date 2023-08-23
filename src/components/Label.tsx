import Card from '@mui/material/Card';
import { IWoundState } from '../store';
import CardContent from '@mui/material/CardContent';
import { Html } from '@react-three/drei';

export const Label = ({ wound }: { wound: IWoundState }) => {
  if (wound.woundType === undefined) {
    return <></>;
  }
  return (
    <Html key={wound.bodyPart} position={wound.position}>
      <div className={wound.position.x < 0 ? 'label left' : 'label right'}>
        <Card elevation={1} variant="outlined">
          <CardContent>{wound.woundType}</CardContent>
        </Card>
      </div>
    </Html>
  );
};
