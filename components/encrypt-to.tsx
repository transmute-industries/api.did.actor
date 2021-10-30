import { TextField } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";

import JsonMessageEncrypter from "./json-message-encrypter";
export const EncryptTo = () => {
  const router = useRouter();
  const [did, setDid] = React.useState(
    "did:key:z6MktiSzqF9kqwdU8VkdBKx56EYzXfpgnNPUAGznpicNiWfn"
  );

  const handleResolve = () => {
    // router.push("/e/" + did);
  };

  return (
    <>
      {" "}
      <JsonMessageEncrypter value={{}} />
      <TextField
        style={{ marginTop: "32px" }}
        label="Message Recipient"
        multiline
        value={did}
        fullWidth
        onChange={(event: any) => {
          setDid(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Encrypt to DID" onClick={handleResolve}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
