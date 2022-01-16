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

export const CredentialPreview = ({ credential, verifyCredential }: any) => {
  const [status, setStatus]: any = React.useState(null);
  const [issuer, setIssuer] = React.useState("");
  const [subject, setSubject] = React.useState("");

  const handleVerifyMessage = React.useCallback(() => {
    setStatus("pending");
    setTimeout(async () => {
      try {
        const help = async (verifiableCredential: any) => {
          const res = await verifyCredential({
            verifiableCredential,
            // format,
          });
          return {
            verified: res.verified,
            issuer:
              verifiableCredential.issuer.id || verifiableCredential.issuer,
            subject: verifiableCredential.credentialSubject.id || "No Subject",
          };
        };
        const { verified, issuer, subject } = await help(credential);

        setIssuer(issuer);
        setSubject(subject);
        setStatus(verified ? "success" : "failure");
      } catch (e) {
        console.error(e);
        alert("verification failed.");
      }
    }, 1 * 1000);
  }, [setStatus, setIssuer, setSubject, verifyCredential, credential]);

  React.useEffect(() => {
    if (status === null) {
      handleVerifyMessage();
    }
  }, [handleVerifyMessage, status]);

  function isValidHttpUrl(data: string) {
    let url;

    try {
      url = new URL(data);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  let contextToShow = credential["@context"][credential["@context"].length - 1];
  if (!isValidHttpUrl(contextToShow)) {
    contextToShow = credential["@context"][0];
  }
  let typeToShow = credential["type"][credential["type"].length - 1];

  return (
    <>
      <AppBar position="relative" color={"transparent"}>
        <Toolbar sx={{ marginBottom: "32px", marginTop: "32px" }}>
          <AvatarSpinner status={status} />
          <div style={{ flexGrow: 1, marginLeft: "24px" }}>
            <Typography component="div">
              {credential.name || _.startCase(typeToShow)}
            </Typography>
            <Link href={contextToShow} style={{ fontSize: ".8em" }}>
              {contextToShow}
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
          {issuer && (
            <DIDAsTextField
              label="Credential Issuer"
              did={issuer}
              style={{ marginTop: "32px", marginBottom: "32px" }}
            />
          )}

          {subject && subject !== "No Subject" && (
            <DIDAsTextField
              label="Credential Subject"
              did={subject}
              style={{ marginBottom: "32px" }}
            />
          )}
          <Accordion
            title={"Details"}
            content={<JsonViewReadOnly value={credential} />}
          />
        </div>
      </AppBar>
    </>
  );
};
