/* eslint-disable @next/next/no-img-element */
import React from "react";

import { CircularProgress, Typography, Box, Button, Grid } from "@mui/material";

import { useRouter } from "next/router";
import SendIcon from "@mui/icons-material/Send";
import SourceIcon from "@mui/icons-material/Source";

import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { resolvers } from "../core/resolvers";

import CreateIcon from "@mui/icons-material/Create";

export const ResolutionResult = ({ did }: any) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [resolution, setResolution]: any = React.useState(null);
  React.useEffect(() => {
    if (did) {
      (async () => {
        const resolutionData = await resolvers.resolve(did);
        setResolution(resolutionData);
        setLoading(false);
      })();
    }
  }, [did]);
  if (loading) {
    return (
      <Box style={{ display: "flex", flexGrow: 1, flexDirection: "row" }}>
        <CircularProgress />
        <Typography style={{ marginLeft: "16px", marginTop: "8px" }}>
          Resolving DID...
        </Typography>
      </Box>
    );
  }

  if (!resolution) {
    return <div>Resolution failed for {did}</div>;
  }

  const didDocumentToButtons = (didDocument: any) => {
    const buttons = [];
    // supports credential issuance
    if (didDocument.verificationMethod && didDocument.assertionMethod.length) {
      buttons.push(
        <Grid item>
          <Button
            onClick={() => {
              router.push("/issue?subject=" + resolution.didDocument.id);
            }}
            variant="outlined"
            color={"secondary"}
            endIcon={<CreateIcon />}
          >
            Issue To
          </Button>
        </Grid>
      );
    }

    // supports encryption
    if (
      didDocument.verificationMethod &&
      didDocument.keyAgreement.length &&
      !resolution.didDocument.id.startsWith("did:key:zQ3") // don't offer encryption to secp256k1 keys
    ) {
      buttons.push(
        <Grid item>
          <Button
            onClick={() => {
              router.push("/encrypt?recipient=" + resolution.didDocument.id);
            }}
            variant="outlined"
            color={"secondary"}
            endIcon={<SendIcon />}
          >
            Encrypt To
          </Button>
        </Grid>
      );
    }

    // supports trace api
    if (
      didDocument.service &&
      didDocument.service[0].type === "TraceabilityAPI"
    ) {
      buttons.push(
        <Grid item>
          <Button
            onClick={() => {
              const endpoint = didDocument.service[0].serviceEndpoint;
              const url = new URL(endpoint);
              window.location.href = url.origin + "/docs";
            }}
            variant="outlined"
            color={"secondary"}
            endIcon={<TrackChangesIcon />}
          >
            Traceability API
          </Button>
        </Grid>
      );
    }
    return buttons;
  };

  return (
    <>
      <div>
        <div>
          <Grid container spacing={4}>
            <Grid item>
              <Button
                onClick={() => {
                  router.push("/api/identifiers/" + resolution.didDocument.id);
                }}
                variant="outlined"
                color={"primary"}
                endIcon={<SourceIcon />}
              >
                View Source
              </Button>
            </Grid>

            {didDocumentToButtons(resolution.didDocument)}
          </Grid>
        </div>
      </div>
    </>
  );
};
