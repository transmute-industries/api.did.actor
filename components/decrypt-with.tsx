import React from "react";

import { useRouter } from "next/router";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import { Button, Grid } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const DecryptWith = ({ value }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(value);
  const handleChange = (newText: any) => {
    setText(newText);
  };
  const handleDecrypt = () => {
    router.push("/d/" + text);
  };
  return (
    <>
      <Grid container style={{ marginBottom: "8px" }}>
        <Grid item style={{ flexGrow: 1 }}></Grid>
        <Grid item>
          <Button
            endIcon={<LockOpenIcon />}
            onClick={handleDecrypt}
            variant={"contained"}
            color={"secondary"}
            style={{ marginTop: "16px" }}
          >
            Decrypt with Mnemonic
          </Button>
        </Grid>
      </Grid>
      <AceEditor
        mode="text"
        theme="pastel_on_dark"
        style={{ width: "100%" }}
        onChange={handleChange}
        value={text}
        wrapEnabled={true}
        editorProps={{
          $blockScrolling: true,
          useWorker: false,
        }}
      />
    </>
  );
};

export default DecryptWith;
