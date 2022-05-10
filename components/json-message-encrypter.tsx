import React from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-pastel_on_dark";

import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/router";

import CreateIcon from "@mui/icons-material/Create";

const JsonMessageEncrypter = ({ value, recipient }: any) => {
  const router = useRouter();
  const [text, setText] = React.useState(JSON.stringify(value, null, 2));

  const [messageRecipient, setMessageRecipient] = React.useState(recipient);

  const handleEncrypt = async () => {
    const endpoint = "/api/ciphers/encrypt";
    const data = {
      recipient: messageRecipient,
      message: JSON.parse(text),
    };
    const response = await fetch(endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(data),
    });
    const token = await response.text();
    router.push("/d/" + token);
  };

  const handleChange = (newText: any) => {
    setText(newText);
  };
  return (
    <>
      <TextField
        label="Message Recipient"
        multiline
        value={messageRecipient}
        onChange={(event) => {
          setMessageRecipient(event.target.value);
        }}
        style={{ marginBottom: "32px", marginTop: "32px" }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="encrypt for recipient"
                color={"primary"}
                onClick={handleEncrypt}
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

export default JsonMessageEncrypter;
