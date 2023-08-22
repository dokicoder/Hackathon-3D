import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FilterableTreeView from "./FilterableTreeView";
import { useState } from "react";
import { TextField, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Wound } from "../AppContainer";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CssTextField = styled(TextField)({
  "& .MuiInput-root:before": {
    borderBottomColor: "transparent",
  },
});

export const SideBar = ({
  wound,
  saveWound,
}: {
  wound: Wound;
  saveWound: (wound: Wound) => void;
}): JSX.Element => {
  const [selectedWoundType, setSelectedWoundType] = useState<string>(
    wound.woundType
  );

  const onSaveHandler = (): void => {
    saveWound({
      woundType: selectedWoundType,
      createDate: new Date(),
    });
  };

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
          Körperlokation
        </Typography>
        <CssTextField
          id="filled-basic"
          variant="standard"
          value="Hand rechts untere Seite"
        />

        <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />
        <Typography fontSize="1.5em" marginTop="8px" marginBottom="8px">
          Wundtyp
        </Typography>
        <FilterableTreeView onItemSelected={setSelectedWoundType} />
        {selectedWoundType && <p>Ausgewählter Wundtype: {selectedWoundType}</p>}

        <Typography marginTop="8px" marginBottom="8px">
          Zeitpunkt des ersten Auftritts der Wunde
        </Typography>
        <DatePicker />
        <div>
          <Button onClick={() => onSaveHandler()}>Speichern</Button>
        </div>
      </CardContent>
    </Card>
  );
};
