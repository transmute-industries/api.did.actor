import * as React from "react";

import {
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";

export default function AdvancedSuiteOptions({
  type,
  advancedConfiguration,
  setAdvancedConfiguration,
}: any) {
  const [state, setState] = React.useState({
    advanced: false,
  });

  const types =
    type === "VerifiableCredential"
      ? [
          { name: "Linked Data Proof VC", value: "vc" },
          { name: "IANA VC JWT", value: "vc-jwt" },
        ]
      : [
          { name: "Linked Data Proof VP", value: "vp" },
          { name: "IANA VP JWT", value: "vp-jwt" },
        ];

  const handleChangeVcFormat = (event: any) => {
    setAdvancedConfiguration({
      ...advancedConfiguration,
      format: event.target.value,
      suite:
        event.target.value === "vc-jwt" || event.target.value === "vp-jwt"
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

  const ldSuiteOptions =
    advancedConfiguration.keyType === "ed25519"
      ? [
          { name: "Ed25519Signature2018", value: "Ed25519Signature2018" },
          { name: "JsonWebSignature2020", value: "JsonWebSignature2020" },
        ]
      : [{ name: "JsonWebSignature2020", value: "JsonWebSignature2020" }];

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
              label={state.advanced ? "Custom" : "Default Suite"}
            />
          </FormGroup>
        </FormControl>
      </Grid>

      {state.advanced && (
        <>
          <Grid item>
            <FormControl>
              <InputLabel id="select-format-label">Format</InputLabel>
              <Select
                labelId="select-format-label"
                id="select-format"
                value={advancedConfiguration.format}
                label="Format"
                onChange={handleChangeVcFormat}
              >
                {types.map((i) => {
                  return (
                    <MenuItem key={i.name} value={i.value}>
                      {i.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="select-suite-type-label">Suite</InputLabel>
              <Select
                labelId="select-suite-type-label"
                id="select-suite-type"
                value={advancedConfiguration.suite}
                label="Suite"
                disabled={
                  advancedConfiguration.format === "vc-jwt" ||
                  advancedConfiguration.format === "vp-jwt" ||
                  ldSuiteOptions.length === 1
                }
                onChange={handleChangeVcSuite}
              >
                {ldSuiteOptions.map((i) => {
                  return (
                    <MenuItem key={i.name} value={i.value}>
                      {i.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
}
