"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { ISourceOptions, Engine } from "@tsparticles/engine";
import { useEffect } from "react";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesComponentProps {
  id: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id }) => {
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      // You can initiate the tsParticles instance (engine) here
      await loadSlim(engine);
    });
  }, []);

  const options: ISourceOptions = {
    background: {
      color: {
        value: "transparent", // Ensure transparent background
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 120,
        },
      },
    },
    particles: {
      color: {
        value: "#FFFFFF",
      },
      links: {
        color: "#FFFFFF",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 150,
      },
      opacity: {
        value: 1.0,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return <Particles id={id} options={options} />;
};

export default ParticlesComponent;
