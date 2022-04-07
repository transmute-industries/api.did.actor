import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { ParticlesBlock } from "../components/particles-block";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>did actor</title>
        <meta name="description" content="Decentralized identifiers api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        <ParticlesBlock>
          <Box
            style={{
              marginTop: "64px",
              flexGrow: 1,
            }}
          >
            <Typography
              variant={"h5"}
              style={{ marginTop: "16px", marginBottom: "32px" }}
            >
              Built with
            </Typography>
            <Grid container spacing={8}>
              <Grid item>
                <a
                  href="https://mui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/material-ui.svg"
                    alt="Material UI Logo"
                    width={64}
                    height={64}
                  />
                </a>
              </Grid>

              <Grid item>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/nextjs-white-logo.svg"
                    alt="Next.js Logo"
                    width={128}
                    height={51}
                  />
                </a>
              </Grid>

              <Grid item>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/vercel-logotype-light.svg"
                    alt="Vercel Logo"
                    width={128}
                    height={51}
                  />
                </a>
              </Grid>

              <Grid item>
                <a
                  href="https://did.key.transmute.industries"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/transmute-white.svg"
                    alt="Transmute Logo"
                    width={128}
                    height={51}
                  />
                </a>
              </Grid>
              <Grid item>
                <a
                  href="https://mesur.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/mesur_logo.png"
                    alt="mesur.io Logo"
                    width={128}
                    height={51}
                  />
                </a>
              </Grid>
            </Grid>
          </Box>
        </ParticlesBlock>
        ;
      </AppPage>
    </>
  );
};

export default About;
