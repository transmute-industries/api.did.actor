import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";
import { defaultMnemonic } from "../core/defaultMnemonic";
import CreateIcon from "@mui/icons-material/Create";
import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { provePresentation } from "../vc-api";
import { v4 as uuidv4 } from "uuid";

import { compact } from "../core/compact";

import KeyTypeRadionButtonGroup from "./key-type-radio-button-group";

import AdvancedSuiteOptions from "./advanced-suite-options";

const JsonPresentationHolder = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  const [keyType, setKeyType] = React.useState("ed25519");
  const [domain, setDomain] = React.useState("");
  const [challenge, setChallenge] = React.useState(uuidv4());

  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    keyType: "ed25519",
    format: "vp",
    suite: "Ed25519Signature2018",
  });

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    setAdvancedConfiguration(newState);
    handleMnemonicChange(keyType, mnemonic);
  };

  const handleKeyTypeChange = (_e: any, newKeyType: string) => {
    setKeyType(newKeyType);
    handleMnemonicChange(newKeyType, mnemonic);
  };

  const handleMnemonicChange = async (keyType: string, newMnemonic: string) => {
    setMnemonic(newMnemonic);
    try {
      const [assertionMethod] = await getKeysForMnemonic(keyType, newMnemonic);
      const presentation = JSON.parse(text);
      if (presentation.holder.id) {
        presentation.holder.id = assertionMethod.controller;
      } else {
        presentation.holder = assertionMethod.controller;
      }

      setText(JSON.stringify(presentation, null, 2));
    } catch (e) {
      console.error(e);
      //
    }
  };
  const handleProve = async () => {
    const vp = await provePresentation({
      presentation: JSON.parse(text),
      options: { domain, challenge },
      mnemonic,
      keyType: keyType,
      hdpath: advancedConfiguration.hdpath,
      proofType: advancedConfiguration.suite,
      format: advancedConfiguration.format,
    });

    const pathParam =
      advancedConfiguration.format !== "vp-jwt" ? compact(vp) : vp;
    router.push("/v/" + pathParam);
  };
  return (
    <>
      <KeyTypeRadionButtonGroup
        keyType={keyType}
        handleKeyTypeChange={handleKeyTypeChange}
      />
      <TextField
        label="Mnemonic for Holder"
        multiline
        value={mnemonic}
        onChange={(event) => {
          handleMnemonicChange(keyType, event.target.value);
        }}
        style={{ marginBottom: "32px", marginTop: "32px" }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="sign presentation"
                onClick={handleProve}
                color={"primary"}
              >
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

      <AdvancedSuiteOptions
        type={"VerifiablePresentation"}
        advancedConfiguration={advancedConfiguration}
        setAdvancedConfiguration={handleUpdateToAdvancedConfiguration}
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

export default JsonPresentationHolder;
