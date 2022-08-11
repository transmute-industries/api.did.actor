import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import { Button, Grid } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import { useRouter } from "next/router";

import { compact } from "../core/compact";
const JsonVerifier = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));
  const handleChange = (newText: any) => {
    setText(newText);
  };
  const handleVerify = () => {
    let messageParam: any = text;
    try {
      messageParam = compact(JSON.parse(text));
    } catch (e) {
      //
    }
    router.push("/v/" + messageParam);
  };
  return (
    <>
      <Grid container style={{ marginBottom: "8px" }}>
        <Grid item style={{ flexGrow: 1 }}></Grid>
        <Grid item>
          <Button
            endIcon={<BiotechIcon />}
            onClick={handleVerify}
            variant={"contained"}
            color={"secondary"}
            style={{ marginTop: "16px" }}
          >
            Verify
          </Button>
        </Grid>
      </Grid>
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

export default JsonVerifier;
