import type { NextPage } from "next";
import Head from "next/head";
import { AppPage } from "../components/app-page";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

import TweetEmbed from "react-tweet-embed";

const HorizontalLinearStepper = ({ tweets }: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: any) => {
    return step === 1;
  };

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", p: 4, mt: 8 }}>
      <Stepper activeStep={activeStep}>
        {tweets.data.map((tweet: any, index: any) => {
          const stepProps: any = {};
          const labelProps: any = {};
          return (
            <Step key={tweet.id} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === tweets.data.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{`That's all for now.`}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>

            <Button onClick={handleNext} variant={"contained"}>
              {activeStep === tweets.data.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
          <Box sx={{ height: "100%" }}>
            <TweetEmbed
              tweetId={tweets.data[activeStep].id}
              placeholder={"loading"}
              className={"masonry-embedded-tweet"}
              options={{
                theme: "dark",
                // cards: "hidden"
              }}
            />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

const Tweets: NextPage = () => {
  const [twitterData, setTwitterData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/tweets");
      const data = await response.json();
      setTwitterData(data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>did actor</title>
        <meta name="description" content="Decentralized identifiers api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppPage>
        {twitterData === null ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
            flexGrow={1}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading recent tweets...</Typography>
          </Box>
        ) : (
          <HorizontalLinearStepper tweets={twitterData} />
        )}
      </AppPage>
    </>
  );
};

export default Tweets;
