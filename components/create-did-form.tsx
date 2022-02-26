import React from "react";
import { yellow } from "@mui/material/colors";
import { Typography, TextField, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  const [keyType, setKeyType] = React.useState("ed25519");
  const [key, setKey] = React.useState("");

  const handleKeyTypeChange = (_e: any, newKeyType: string) => {
    setKeyType(newKeyType);
    handleUpdateKey(newKeyType, mnemonic);
  };

  const handleUpdateKey = React.useCallback(
    async (keyType: string, mnemonic: string) => {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const root = hdkey.fromMasterSeed(seed);
      const hdpath = `m/44'/${DID_KEY_BIP44_COIN_TYPE}'/0'/0/0`;
      const addrNode = root.derive(hdpath);

      const res = await generators.didKey(keyType, addrNode._privateKey);
      setKey(res.didDocument.id);

      setConfig({ key: res.didDocument.id, mnemonic });
    },
    [setKey, setConfig]
  );

  const handleGenerateMnemonic = React.useCallback(async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(keyType, m);
  }, [keyType, handleUpdateKey]);

  React.useEffect(() => {
    if (key === "") {
      handleUpdateKey(keyType, mnemonic);
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [key, keyType, handleGenerateMnemonic, handleUpdateKey, mnemonic]);

  const handleCreate = () => {
    router.push("/" + config.key);
  };

  return (
    <div style={{ maxWidth: "512px", margin: "auto" }}>
      <div>
        <FormControl sx={{ mb: 2 }}>
          <FormLabel id="key-type">Key Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="key-type"
            name="key-type-group"
            value={keyType}
            onChange={handleKeyTypeChange}
          >
            <FormControlLabel
              value="ed25519"
              control={<Radio />}
              label="Ed25519"
            />
            <FormControlLabel
              value="secp256k1"
              control={<Radio />}
              label="Secp256k1"
            />
          </RadioGroup>
        </FormControl>
      </div>
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
