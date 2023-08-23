import { Card, CardContent } from '@mui/material';
import { useWoundDocStore } from '../store';
export const WoundList = () => {
  const { wounds, selectWound } = useWoundDocStore();

  return (
    <Card
      style={{
        position: 'absolute',
        zIndex: 1000,
        bottom: 200,
        left: 0,
      }}
    >
      <CardContent>
        {wounds.map((wound) => (
          <div key={wound.woundType} onClick={() => selectWound(wound.id)}>
            {wound.woundType}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
