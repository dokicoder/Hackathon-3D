import { Card, CardContent } from "@mui/material";
import { Wound } from "../AppContainer";

export const WondList = ({ woundList }: { woundList: Wound[] }) => {
  return (
    <Card
      style={{
        position: "absolute",
        bottom: 200,
        left: 0,
      }}
    >
      <CardContent>
        <ul>
          {woundList.map((wound) => (
            <li>{wound.woundType}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
