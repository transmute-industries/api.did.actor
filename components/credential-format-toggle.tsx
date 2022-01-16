import * as React from "react";

import {
  Switch,
  TextField,
  FormControlLabel,
  FormGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";

export default function CredentialFormatToggle({
  advancedConfiguration,
  setAdvancedConfiguration,
}: any) {
  const [state, setState] = React.useState({
    advanced: true,
  });

  const handleChangeVcFormat = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      format: event.target.value,
      suite:
        event.target.value === "vc-jwt"
          ? "JsonWebSignature2020"
          : advancedConfiguration.suite,
    });
  };

  const handleChangeVcSuite = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      suite: event.target.value,
    });
  };

  const handleChangeSwitch = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeHdPath = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      hdpath: event.target.value,
    });
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item>
        <FormControl
          component="fieldset"
          variant="standard"
          style={{ marginBottom: "12px" }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={state.advanced}
                  onChange={handleChangeSwitch}
                  name="advanced"
                />
              }
              label={state.advanced ? "Advanced" : "Basic"}
            />
          </FormGroup>
        </FormControl>
      </Grid>

      {state.advanced && (
        <>
          <Grid item>
            <FormControl>
              <TextField
                label="HD Path"
                value={advancedConfiguration.hdpath}
                onChange={handleChangeHdPath}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="select-vc-format-label">Format</InputLabel>
              <Select
                labelId="select-vc-format-label"
                id="select-vc-format"
                value={advancedConfiguration.format}
                label="Format"
                onChange={handleChangeVcFormat}
              >
                <MenuItem value={"vc"}>VC</MenuItem>
                <MenuItem value={"vc-jwt"}>VC JWT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="select-vc-suite-type-label">Suite</InputLabel>
              <Select
                labelId="select-vc-suite-type-label"
                id="select-vc-suite-type"
                value={advancedConfiguration.suite}
                label="Suite"
                disabled={advancedConfiguration.format === "vc-jwt"}
                onChange={handleChangeVcSuite}
              >
                <MenuItem value={"Ed25519Signature2018"}>
                  Ed25519Signature2018
                </MenuItem>
                <MenuItem value={"JsonWebSignature2020"}>
                  JsonWebSignature2020
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
