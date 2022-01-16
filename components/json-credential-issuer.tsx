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

// import CredentialFormatToggle from "./credential-format-toggle";

const JsonCredentialIssuer = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    format: "vc",
    suite: "Ed25519Signature2018",
  });

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    setAdvancedConfiguration(newState);
    if (newState.hdpath !== advancedConfiguration.hdpath) {
      handleUpdateIssuer(mnemonic, newState.hdpath);
    }
  };

  const handleUpdateIssuer = async (mnemonic: string, path: string) => {
    try {
      const [assertionMethod] = await getKeysForMnemonic(mnemonic, path);
      const credential = JSON.parse(text);
      credential.issuer = assertionMethod.controller;
      setText(JSON.stringify(credential, null, 2));
    } catch (e) {
      // console.error(e);
      //
    }
  };

  const handleMnemonicChange = async (newMnemonic: string) => {
    setMnemonic(newMnemonic);
    handleUpdateIssuer(newMnemonic, advancedConfiguration.hdpath);
  };
  const handleIssue = async () => {
    // TODO: vc-jwt bug in browser prevents this from working.
    const vc = await issueCredential({
      credential: JSON.parse(text),
      mnemonic,
      hdpath: advancedConfiguration.hdpath,
      proofType: advancedConfiguration.suite,
      format: advancedConfiguration.format,
    });
    // console.log(vc);
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
      {/* <CredentialFormatToggle
        advancedConfiguration={advancedConfiguration}
        setAdvancedConfiguration={handleUpdateToAdvancedConfiguration}
      /> */}
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
