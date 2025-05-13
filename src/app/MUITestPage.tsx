import { Button as MUIButton } from "@mui/material";

export default function MUITestPage() {
  return (
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
  );
}
