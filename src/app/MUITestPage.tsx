import { Button as MUIButton, ScopedCssBaseline } from "@mui/material";

export default function MUITestPage() {
  return (
    <ScopedCssBaseline enableColorScheme>
      <div className="flex gap-2">
        <MUIButton variant="contained" color="primary">
          Primary
        </MUIButton>
        <MUIButton variant="outlined" color="secondary">
          Secondary
        </MUIButton>
        <MUIButton variant="text" color="error">
          Error
        </MUIButton>
      </div>
    </ScopedCssBaseline>
  );
}
