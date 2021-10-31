import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";
import { defaultMnemonic } from "../core/defaultMnemonic";
import { compact } from "../core/compact";
import CreateIcon from "@mui/icons-material/Create";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { issueCredential } from "../vc-api";
const JsonCredentialIssuer = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  const handleMnemonicChange = async (newMnemonic: string) => {
    setMnemonic(newMnemonic);
    try {
      const [assertionMethod] = await getKeysForMnemonic(newMnemonic);
      const credential = JSON.parse(text);
      credential.issuer = assertionMethod.controller;
      setText(JSON.stringify(credential, null, 2));
    } catch (e) {
      console.error(e);
      //
    }
  };
  const handleIssue = async () => {
    const vc = await issueCredential({
      credential: JSON.parse(text),
      mnemonic,
    });
    router.push("/v/" + compact(vc));
  };
  return (
    <>
      <TextField
        label="Mnemonic for Issuer"
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
              <IconButton
                aria-label="issue credential"
                onClick={handleIssue}
                color={"primary"}
              >
                <CreateIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <AceEditor
        mode="json"
        theme="pastel_on_dark"
        style={{ width: "100%" }}
        onChange={handleChange}
        wrapEnabled={true}
        value={text}
        editorProps={{ $blockScrolling: true, useWorker: false }}
      />
    </>
  );
};

export default JsonCredentialIssuer;
