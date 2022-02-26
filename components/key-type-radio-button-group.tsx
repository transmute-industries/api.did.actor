import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const KeyTypeRadionButtonGroup = ({ keyType, handleKeyTypeChange }: any) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="key-type"
        name="key-type-group"
        value={keyType}
        onChange={handleKeyTypeChange}
      >
        <FormControlLabel value="ed25519" control={<Radio />} label="Ed25519" />
        <FormControlLabel
          value="secp256k1"
          control={<Radio />}
          label="Secp256k1"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default KeyTypeRadionButtonGroup;
