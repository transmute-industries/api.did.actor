import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";
import { defaultMnemonic } from "../core/defaultMnemonic";
import { compact } from "../io/compact";
import CreateIcon from "@mui/icons-material/Create";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { provePresentation } from "../vc-api/provePresentation";

const JsonPresentationHolder = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };
  const [domain, setDomain] = React.useState("");
  const [challenge, setChallenge] = React.useState("");

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  const handleMnemonicChange = async (newMnemonic: string) => {
    setMnemonic(newMnemonic);
    try {
      const [assertionMethod] = await getKeysForMnemonic(newMnemonic);
      const presentation = JSON.parse(text);
      presentation.holder = assertionMethod.controller;
      setText(JSON.stringify(presentation, null, 2));
    } catch (e) {
      console.error(e);
      //
    }
  };
  const handleIssue = async () => {
    const vp = await provePresentation({
      presentation: JSON.parse(text),
      options: { domain, challenge },
      mnemonic,
    });
    console.log(JSON.stringify(vp));
    // router.push("/v/" + compact(vp));
  };
  return (
    <>
      <TextField
        label="Mnemonic for Holder"
        multiline
        value={mnemonic}
        onChange={(event) => {
          handleMnemonicChange(event.target.value);
        }}
        style={{ marginBottom: "32px", marginTop: "32px" }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="sign presentation" onClick={handleIssue}>
                <CreateIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Challenge"
        multiline
        value={challenge}
        onChange={(event) => {
          setChallenge(event.target.value);
        }}
        style={{ marginBottom: "32px" }}
        fullWidth
        helperText={<>This field is considered required by all verifiers.</>}
      />

      <TextField
        label="Domain"
        multiline
        value={domain}
        onChange={(event) => {
          setDomain(event.target.value);
        }}
        helperText={<>This field is considered optional by some verifiers.</>}
        style={{ marginBottom: "32px" }}
        fullWidth
      />

      <AceEditor
        mode="json"
        theme="github"
        style={{ width: "100%" }}
        onChange={handleChange}
        value={text}
        editorProps={{ $blockScrolling: true, useWorker: false }}
      />
    </>
  );
};

export default JsonPresentationHolder;
