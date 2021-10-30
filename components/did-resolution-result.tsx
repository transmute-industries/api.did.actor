/* eslint-disable @next/next/no-img-element */
import React from "react";

import { CircularProgress, Typography, Box, Button, Grid } from "@mui/material";

import { useRouter } from "next/router";
import SendIcon from "@mui/icons-material/Send";
import SourceIcon from "@mui/icons-material/Source";
import { resolvers } from "../core/resolvers";

import CreateIcon from "@mui/icons-material/Create";

export const ResolutionResult = ({ did }: any) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [resolution, setResolution]: any = React.useState(null);
  React.useEffect(() => {
    if (did) {
      (async () => {
        const resolutionData = await resolvers.ed25519(did);
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

  return (
    <>
      <div>
        <div>
          <Grid container spacing={4}>
            <Grid item>
              <Button
                onClick={() => {
                  router.push("/api/" + resolution.didDocument.id);
                }}
                variant="outlined"
                color={"primary"}
                endIcon={<SourceIcon />}
              >
                View Source
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={() => {
                  router.push(
                    "/encrypt?recipient=" + resolution.didDocument.id
                  );
                }}
                variant="outlined"
                color={"secondary"}
                endIcon={<SendIcon />}
              >
                Encrypt
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={() => {
                  router.push("/issue?subject=" + resolution.didDocument.id);
                }}
                variant="outlined"
                color={"secondary"}
                endIcon={<CreateIcon />}
              >
                Issue
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
