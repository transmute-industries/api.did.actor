/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import Particles from "react-tsparticles";

import { Box } from "@mui/material";

import { indigo } from "@mui/material/colors";

// const primary = purple["A100"];
const secondary = indigo["A100"];

export const ParticlesBlock = ({ sx, children }: any) => {
  const nodeColor = secondary;
  const edgeColor = nodeColor;

  const options = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 600,
        },
      },
      color: {
        value: nodeColor,
      },
      shape: {
        type: "polygon",
        polygon: {
          nb_sides: 6,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 6,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: edgeColor,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: "bottom",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 200,
          rotateY: 200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: false,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 100,
          size: 30,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 400,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <Box style={{ display: "flex", flexGrow: 1 }}>
      <Box
        style={{
          position: "absolute",
          display: "flex",
          flexGrow: 1,
        }}
        // sx={{
        //   width: { sm: `calc(100% - ${drawerWidth}px)` },
        //   marginLeft: `-${drawerWidth}px`,
        // }}
      >
        {children}
      </Box>
      <Particles {...sx} options={options} />
    </Box>
  );
};
