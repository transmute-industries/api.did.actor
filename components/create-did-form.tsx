import React from "react";
import { yellow } from "@mui/material/colors";
import { Typography, TextField, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import MemoryIcon from "@mui/icons-material/Memory";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";
import { defaultMnemonic } from "../core/defaultMnemonic";
export const DID_KEY_BIP44_COIN_TYPE = "0";
import { generators } from "../core/generators";
import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/router";

export const CreateDidForm = () => {
  const router = useRouter();
  const [config, setConfig]: any = React.useState(null);
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [key, setKey] = React.useState("");

  const handleUpdateKey = React.useCallback(
    async (mnemonic: string) => {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const root = hdkey.fromMasterSeed(seed);
      const hdPath = `m/44'/${DID_KEY_BIP44_COIN_TYPE}'/0'/0/0`;
      const addrNode = root.derive(hdPath);

      const res = await generators.ed25519(addrNode._privateKey);
      setKey(res.didDocument.id);

      setConfig({ key: res.didDocument.id, mnemonic });
    },
    [setKey, setConfig]
  );

  const handleGenerateMnemonic = React.useCallback(async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(m);
  }, [handleUpdateKey]);

  React.useEffect(() => {
    if (key === "") {
      handleUpdateKey(mnemonic);
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [key, handleGenerateMnemonic, handleUpdateKey, mnemonic]);

  const handleCreate = () => {
    router.push("/" + config.key);
  };

  return (
    <div style={{ maxWidth: "512px", margin: "auto" }}>
      <TextField
        label="Controller"
        value={key.substring(0, 32) + "..."}
        disabled
        fullWidth
      />

      <TextField
        color="warning"
        focused
        style={{ marginTop: "32px" }}
        label="Controller Mnemonic"
        helperText={
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "8px",
            }}
          >
            <WarningIcon color={"warning"} />
            <Typography
              style={{ marginLeft: "9px", color: yellow["700"] }}
              component={"span"}
            >
              Anyone knowing this phrase controls this identifier.
            </Typography>
          </span>
        }
        multiline
        value={mnemonic}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="generate mnemonic"
                onClick={handleGenerateMnemonic}
              >
                <MemoryIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        sx={{ marginTop: "32px" }}
        variant={"outlined"}
        color={"primary"}
        onClick={handleCreate}
      >
        Create
      </Button>
    </div>
  );
};
