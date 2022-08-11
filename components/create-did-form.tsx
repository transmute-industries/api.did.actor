import React from "react";
import { yellow } from "@mui/material/colors";
import { Typography, TextField, Button } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import MemoryIcon from "@mui/icons-material/Memory";
import * as bip39 from "bip39";
import * as hdkey from "hdkey";

import WarningIcon from "@mui/icons-material/Warning";
import { useRouter } from "next/router";

export const DID_KEY_BIP44_COIN_TYPE = "0";

import { defaultMnemonic } from "../core/defaultMnemonic";
import { generators } from "../core/generators";
import KeyTypeRadionButtonGroup from "./key-type-radio-button-group";
import AdvancedKeyType from "./advanced-key-type";

import CreateIcon from "@mui/icons-material/Create";

export const CreateDidForm = () => {
  const router = useRouter();
  const [config, setConfig]: any = React.useState(null);
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [key, setKey] = React.useState("");

  const [advancedConfiguration, setAdvancedConfiguration] = React.useState({
    hdpath: `m/44'/0'/0'/0/0`,
    keyType: "ed25519",
  });

  const handleUpdateToAdvancedConfiguration = (newState: any) => {
    setAdvancedConfiguration(newState);
    if (
      newState.keyType !== advancedConfiguration.keyType ||
      newState.hdpath !== advancedConfiguration.hdpath
    ) {
      handleUpdateKey(newState.keyType, mnemonic, newState.hdpath);
    }
  };

  const handleUpdateKey = React.useCallback(
    async (keyType: string, mnemonic: string, hdpath: string) => {
      try {
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = hdkey.fromMasterSeed(seed);
        const addrNode = root.derive(hdpath);
        const res = await generators.didKey(keyType, addrNode._privateKey);
        setKey(res.didDocument.id);
        setConfig({ key: res.didDocument.id, mnemonic });
      } catch (e) {
        console.error(e);
      }
    },
    [setKey, setConfig]
  );

  const handleGenerateMnemonic = React.useCallback(async () => {
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    handleUpdateKey(
      advancedConfiguration.keyType,
      m,
      advancedConfiguration.hdpath
    );
  }, [advancedConfiguration, handleUpdateKey]);

  React.useEffect(() => {
    if (key === "") {
      handleUpdateKey(
        advancedConfiguration.keyType,
        mnemonic,
        advancedConfiguration.hdpath
      );
    }
    if (mnemonic === "") {
      handleGenerateMnemonic();
    }
  }, [
    advancedConfiguration,
    key,
    handleGenerateMnemonic,
    handleUpdateKey,
    mnemonic,
  ]);

  const handleCreate = () => {
    router.push("/" + config.key);
  };

  return (
    <div style={{ maxWidth: "512px", margin: "auto" }}>
      <TextField
        sx={{ mt: 2, mb: 2 }}
        label="Controller"
        value={key.substring(0, 32) + "..."}
        disabled
        fullWidth
      />

      <AdvancedKeyType
        advancedConfiguration={advancedConfiguration}
        setAdvancedConfiguration={handleUpdateToAdvancedConfiguration}
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
        variant={"contained"}
        color={"secondary"}
        endIcon={<CreateIcon />}
        onClick={handleCreate}
      >
        Create Identifier
      </Button>
    </div>
  );
};
