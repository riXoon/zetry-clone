import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';

import aboutImage from '/img/about.webp';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutImageRef = useRef(null);
  const stoneRef = useRef(null); // Ref for the stone image

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.set('.mask-about-clip', {
      clipPath: 'polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)',
      borderRadius: '0 0 0 0',
    });

    clipAnimation.to('.mask-about-clip', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      width: '100vw',
      height: '100vh',
      borderRadius: '0 0 0 0',
    });
  });

  useEffect(() => {
    // Animation for floating effect on the stone image
    if (stoneRef.current) {
      gsap.to(stoneRef.current, {
        y: '40px', // Move it up by 10px
        repeat: -1, // Infinite loop
        yoyo: true, // Alternate the animation (up and down)
        duration: 1, // Animation duration
        ease: 'power1.inOut', // Ease for smooth transition
      });
    }

    if (aboutImageRef.current) {
        gsap.to(aboutImageRef.current, {
          y: '20px', // Move it up by 10px
          repeat: -1, // Infinite loop
          yoyo: true, // Alternate the animation (up and down)
          duration: 2, // Animation duration
          ease: 'power1.inOut', // Ease for smooth transition
        });
      }
  }, []);


  /* Frame ref animation */

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">Welcome to Zentry</h2>

        <AnimatedTitle
          title="Discover the w<b>o</b>rlds <br /> l<b>a</b>rgest shared adventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry Unites every player from countless games and platforms</p>
        </div>
      </div>

      <div className="h-dvh w-screen border" id="clip">
        <div className="mask-about-clip about-image " ref={aboutImageRef}>
          <img
            src={aboutImage}
            alt="background"
            className="absolute left-0 top-0 size-full object-cover transition-transform duration-500"
          />
        </div>
        {/* Floating Stone Image */}
        <img
          ref={stoneRef}
          src="/img/stones.webp"
          alt="background"
          className="absolute left-0 -top-[13rem] size-full h-[80rem] object-cover z-50 hidden md:block"
        />
      </div>
    </div>
  );
};

export default About;
