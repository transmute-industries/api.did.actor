import React from "react";

import { AvatarSpinner } from "./avatar-spinner";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import _ from "lodash";
import BiotechIcon from "@mui/icons-material/Biotech";

import { DIDAsTextField } from "./did-as-textfield";
import Accordion from "./accordion";
import dynamic from "next/dynamic";
const JsonViewReadOnly = dynamic(() => import("./json-view-read-only"), {
  ssr: false,
});

export const PresentationPreview = ({
  presentation,
  verifyPresentation,
}: any) => {
  const [status, setStatus]: any = React.useState(null);
  const [holder, setHolder] = React.useState("");

  const handleVerifyMessage = React.useCallback(() => {
    setStatus("pending");
    setTimeout(async () => {
      try {
        const help = async (verifiablePresentation: any) => {
          const res = await verifyPresentation({
            verifiablePresentation,
            // format,
            options: {
              challenge: verifiablePresentation.proof.challenge,
              domain: verifiablePresentation.proof.domain,
            },
          });
          return {
            verified: res.verified,
            holder:
              verifiablePresentation.holder.id || verifiablePresentation.holder,
          };
        };
        const { verified, holder } = await help(presentation);

        setHolder(holder);
        setStatus(verified ? "success" : "failure");
      } catch (e) {
        console.error(e);
        alert("verification failed.");
      }
    }, 1 * 1000);
  }, [setStatus, setHolder, verifyPresentation, presentation]);

  React.useEffect(() => {
    if (status === null) {
      handleVerifyMessage();
    }
  }, [handleVerifyMessage, status]);

  return (
    <>
      <AppBar position="relative" color={"transparent"}>
        <Toolbar sx={{ marginBottom: "32px", marginTop: "32px" }}>
          <AvatarSpinner status={status} />
          <div style={{ flexGrow: 1, marginLeft: "24px" }}>
            <Typography component="div">
              {presentation.name || _.startCase(presentation.type)}
            </Typography>
            <Link
              href={presentation["@context"][0]}
              style={{ fontSize: ".8em" }}
            >
              {presentation["@context"][0]}
            </Link>
          </div>
          <Button
            color="primary"
            variant={"outlined"}
            endIcon={<BiotechIcon />}
            onClick={handleVerifyMessage}
          >
            Verify
          </Button>
        </Toolbar>
        <div style={{ padding: "32px" }}>
          {holder && (
            <DIDAsTextField
              label="Presentation Holder"
              did={holder}
              style={{ marginBottom: "32px" }}
            />
          )}

          <Accordion
            title={"Details"}
            content={<JsonViewReadOnly value={presentation} />}
          />
        </div>
      </AppBar>
    </>
  );
};
