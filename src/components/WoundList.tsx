import { Card, CardContent } from '@mui/material';
import { Wound } from '../AppContainer';

export const WoundList = ({
  woundList,
  onSelectWound,
}: {
  woundList: Wound[];
  onSelectWound: (wound: Wound) => void;
}) => {
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
        {woundList.map((wound) => (
          <div key={wound.woundType} onClick={() => onSelectWound(wound)}>
            {wound.woundType}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
