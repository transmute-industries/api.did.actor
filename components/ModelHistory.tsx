import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import workflowInstance from "./linear-integration-example.json";
import _ from "lodash";
import moment from "moment";

const workflowSteps = workflowInstance.path.reverse();
console.log({ workflowSteps });
export const ModelHistory = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          Last Workflow: urn:uuid:5094d303-1770-490e-8c2b-5d6eaeb5560b{" "}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Timeline>
          {workflowSteps.map((workflowStep, i) => {
            return (
              <TimelineItem key={i}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {moment()
                    .subtract(workflowInstance.path.length + i, "days")
                    .fromNow()}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h6" component="span">
                    {_.startCase(workflowStep.id.split("_").pop())}
                  </Typography>
                  <pre>{JSON.stringify(workflowStep.output, null, 2)}</pre>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </AccordionDetails>
    </Accordion>
  );
};
