import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FilterableTreeView from "./FilterableTreeView";
import { useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Wound } from "../AppContainer";

export const SideBar = ({ wound }: { wound: Wound }): JSX.Element => {
  const [selectedWoundType, setSelectedWoundType] = useState<string>("");

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography fontSize="1.5em" marginTop="16px" marginBottom="24px">
          Wunde hinzufügen
        </Typography>
        <FilterableTreeView onItemSelected={setSelectedWoundType} />
        <p>Selected wound type: {selectedWoundType}</p>
        <Button>Speichern</Button>
      </CardContent>
    </Card>
  );
};
