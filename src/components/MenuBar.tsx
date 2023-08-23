import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';

const ValueLabelComponent = (props: any) => {
  return (
    <Tooltip
      open={props.open}
      enterTouchDelay={0}
      placement="top"
      title={props.value}
      disableTouchListener={true}
      arrow={true}
    >
      {props.children}
    </Tooltip>
  );
};

export const MenuBar = (): JSX.Element => {
  return (
    <Card sx={{ position: 'absolute', top: 30, left: '50%', width: 400 }}>
      <CardContent>
        <Slider
          defaultValue={10}
          aria-label="Default"
          valueLabelDisplay="auto"
          components={{ ValueLabel: ValueLabelComponent }}
        />
      </CardContent>
    </Card>
  );
};
