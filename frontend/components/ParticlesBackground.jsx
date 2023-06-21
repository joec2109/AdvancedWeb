import Particles from "react-tsparticles"
import {loadSlim} from "tsparticles-slim"
import {useCallback, useMemo} from "react";

const ParticlesBackground = () => {
    const options = useMemo(() => {
        return {
            
            background: {
            color: "#FFF", // this sets a background color for the canvas
          },
          fullScreen: {
            enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
            zIndex: 2, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
          },
          interactivity: {
            
            events: {
              onClick: {
                enable: true, // enables the click event
                mode: "push", // adds the particles on click
              },
              onHover: {
                enable: true, // enables the hover event
                mode: "repulse", // make the particles run away from the cursor
              },
            },
            modes: {
              push: {
                quantity: 3, // number of particles to add on click
              },
              repulse: {
                distance: 200, // distance of the particles from the cursor
              },
            },
          },
          particles: {
            color: "#75B996",
            links: {
              enable: true, // enabling this will make particles linked together
              distance: 200, // maximum distance for linking the particles
              color:"75B996",
            },
            move: {
              enable: true, // enabling this will make particles move in the canvas
              speed: { min: 1, max: 5 }, // using a range in speed value will make particles move in a random speed between min/max values, each particles have its own value, it won't change in time by default
            },
            opacity: {
              value: { min: 0.7, max: 1 }, // using a different opacity, to have some semitransparent effects
            },
            size: {
              value: { min: 3, max: 7 }, // let's randomize the particles size a bit
            },
          },
        
        };
    }, []);

    const particlesInit = useCallback((engine) => {
        loadSlim(engine);
    }, []);

    return <Particles init = {particlesInit} options={options} />
}

export default ParticlesBackground