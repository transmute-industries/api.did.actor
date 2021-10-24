/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../../../components/app-page";
import React from "react";
import { TextField, Grid } from "@mui/material";
import { CircularProgress, Typography, Link, Hidden, Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";

import { issueTo } from "../../../io/issue";

import axios from "axios";
import { useRouter } from "next/router";
import { DIDAsTextField } from "../../../components/did-as-textfield";
import CreateIcon from "@mui/icons-material/Create";
import { defaultMnemonic } from "../../../core/defaultMnemonic";
export async function getServerSideProps(context: any) {
  return {
    props: {
      did: context.params.did,
    }, // will be passed to the page component as props
  };
}

const Issue: NextPage = (props: any) => {
  const router = useRouter();
  const did: any = props.did;
  const title = did ? did.substr(0, 9) + "..." + did.substr(-4) : "unknown";
  const [mnemonic, setMnemonic] = React.useState(defaultMnemonic);
  const [subject, setSubject] = React.useState("did:example:123");

  const [resolution, setResolution]: any = React.useState(null);
  React.useEffect(() => {
    if (did) {
      (async () => {
        const res = await axios.get(window.location.origin + "/" + did, {
          headers: {
            accept: "application/did+json",
          },
        });

        const resultData = res.data as any;
        setResolution(resultData);
      })();
    }
  }, [did]);

  const handleIssue = async () => {
    const vc = await issueTo(resolution.didDocument, { subject }, mnemonic);
    router.push("/v/" + vc);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "5vh" }}
        >
          <Grid item xs={3}>
            <div style={{ width: "100%", maxWidth: "640px" }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {!resolution && (
                  <>
                    <Box
                      style={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: "row",
                      }}
                    >
                      <CircularProgress />
                      <Typography
                        style={{ marginLeft: "16px", marginTop: "8px" }}
                      >
                        Resolving DID...
                      </Typography>
                    </Box>
                  </>
                )}
                {resolution && (
                  <>
                    <Box style={{ marginTop: "32px", marginBottom: "32px" }}>
                      {/* <ResolutionResult did={did} /> */}

                      <DIDAsTextField
                        did={resolution.didDocument.id}
                        label="Issuer"
                        style={{ marginTop: "16px" }}
                      />
                    </Box>

                    <TextField
                      label="Subject"
                      multiline
                      value={subject}
                      onChange={(event) => {
                        setSubject(event.target.value);
                      }}
                      fullWidth
                    />

                    <TextField
                      label="Mnemonic for Issuer"
                      multiline
                      value={mnemonic}
                      onChange={(event) => {
                        setMnemonic(event.target.value);
                      }}
                      style={{ marginBottom: "32px", marginTop: "32px" }}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="issue credential"
                              onClick={handleIssue}
                            >
                              <CreateIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
              </Box>
            </div>
          </Grid>
        </Grid>
      </AppPage>
    </>
  );
};

export default Issue;
