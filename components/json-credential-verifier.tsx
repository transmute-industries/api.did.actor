import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import { Button } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import { useRouter } from "next/router";

import { compact } from "../io/compact";
const JsonCredentialVerifier = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };
  const handleVerify = () => {
    const vc = compact(JSON.parse(text));
    router.push("/v/" + vc);
  };
  return (
    <>
      <AceEditor
        mode="json"
        theme="github"
        style={{ width: "100%" }}
        onChange={handleChange}
        value={text}
        editorProps={{ $blockScrolling: true, useWorker: false }}
      />
      <Button
        endIcon={<BiotechIcon />}
        onClick={handleVerify}
        variant={"contained"}
        color={"secondary"}
        style={{ marginTop: "16px" }}
      >
        Verify
      </Button>
    </>
  );
};

export default JsonCredentialVerifier;
