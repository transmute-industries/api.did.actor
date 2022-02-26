import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";

import CreateIcon from "@mui/icons-material/Create";
import { defaultMnemonic } from "../core/defaultMnemonic";
import { compact } from "../core/compact";

import { getKeysForMnemonic } from "../core/getKeysForMnemonic";
import { issueCredential } from "../vc-api";

import CredentialFormatToggle from "./credential-format-toggle";

import KeyTypeRadionButtonGroup from "./key-type-radio-button-group";
const JsonCredentialIssuer = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };

  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);

  const handleKeyTypeChange = (_e: any, newKeyType: string) => {
    const newState = {
      ...advancedConfiguration,
      keyType: newKeyType,
      suite:
        newKeyType === "ed25519"
          ? "Ed25519Signature2018"
          : "JsonWebSignature2020",
    };

    handleUpdateToAdvancedConfiguration(newState);
  };

  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    keyType: "ed25519",
    format: "vc",
    suite: "Ed25519Signature2018",
  });

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    setAdvancedConfiguration(newState);
    if (
      newState.keyType !== advancedConfiguration.keyType ||
      newState.hdpath !== advancedConfiguration.hdpath
    ) {
      handleUpdateIssuer(newState.keyType, mnemonic, newState.hdpath);
    }
  };

  const handleUpdateIssuer = async (
    keyType: string,
    mnemonic: string,
    path: string
  ) => {
    try {
      const [assertionMethod] = await getKeysForMnemonic(
        keyType,
        mnemonic,
        path
      );
      const credential = JSON.parse(text);

      if (credential.issuer.id) {
        credential.issuer.id = assertionMethod.controller;
      } else {
        credential.issuer = assertionMethod.controller;
      }

      if (assertionMethod.controller.startsWith("did:key:zQ3")) {
        credential["@context"] = [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/security/suites/jws-2020/v1",
        ];
        delete credential.credentialStatus;
      } else {
        credential["@context"] = [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/vc-revocation-list-2020/v1",
        ];
        credential.credentialStatus = {
          id: "https://api.did.actor/revocation-lists/1.json#0",
          type: "RevocationList2020Status",
          revocationListIndex: 0,
          revocationListCredential:
            "https://api.did.actor/revocation-lists/1.json",
        };
      }
      setText(JSON.stringify(credential, null, 2));
    } catch (e) {
      // console.error(e);
      //
    }
  };

  const handleMnemonicChange = async (newMnemonic: string) => {
    setMnemonic(newMnemonic);
    handleUpdateIssuer(
      advancedConfiguration.keyType,
      newMnemonic,
      advancedConfiguration.hdpath
    );
  };
  const handleIssue = async () => {
    // TODO: vc-jwt bug in browser prevents this from working.
    const vc = await issueCredential({
      credential: JSON.parse(text),
      mnemonic,
      keyType: advancedConfiguration.keyType,
      hdpath: advancedConfiguration.hdpath,
      proofType: advancedConfiguration.suite,
      format: advancedConfiguration.format,
    });

    const pathParam = vc.issuer ? compact(vc) : vc;
    router.push("/v/" + pathParam);
  };
  return (
    <>
      <KeyTypeRadionButtonGroup
        keyType={advancedConfiguration.keyType}
        handleKeyTypeChange={handleKeyTypeChange}
      />
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

      <CredentialFormatToggle
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

export default JsonCredentialIssuer;
