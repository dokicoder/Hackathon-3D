import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FilterableTreeView from "./FilterableTreeView";

export const SideBar = (): JSX.Element => {
  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <h1>Wunde hinzufügen</h1>
        <FilterableTreeView />
      </CardContent>
    </Card>
  );
};
