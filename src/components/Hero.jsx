import { React, useRef, useState, useEffect } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const miniVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Correct logic for the upcoming video index
  const getNextIndex = (index) => (index % totalVideos) + 1; // This will give the next video in a loop

  const upcomingVideoIndex = getNextIndex(currentIndex); // Get the upcoming video index

  // Correct video source logic
  const getVideoSrc = (index) => {
    const validIndex = index > totalVideos ? index % totalVideos || totalVideos : index;
    return `./videos/hero-${validIndex}.mp4`;
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1){
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (hasClicked && miniVideoRef.current) {
      // After the click, change the mini video thumbnail to the next video
      miniVideoRef.current.src = getVideoSrc(upcomingVideoIndex);
    }
  }, [hasClicked, upcomingVideoIndex]);

  //GSAP function for the video transition when clicking the mini video thumbnail
  useGSAP(
    () => {
      if (hasClicked) {
        // Hide the current video to create space for the zoom-in effect of the next video
        gsap.set('#current-video', { zIndex: 10 });
        gsap.set('#next-video', { visibility: 'visible' });

        // Animate the zoom-in effect for the next video
        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextVideoRef.current?.play(),
          onComplete: () => {
            setHasClicked(false);
          }
        });

        // Keep the current video visible while animating
        gsap.fromTo(
          '#current-video',
          { transformOrigin: 'center center', scale: 0 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.set('#current-video', { clearProps: 'all' });
              gsap.set('#next-video', { zIndex: 20 });
              // Reset `hasClicked` after the animation completes
              setTimeout(() => setHasClicked(false), 1500);
            },
          }
        );
      }
    },
    {
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    }
  );

  //GSAP function for scroll animation
  useGSAP( () => {
    gsap.set('#video-frame', {
        clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
        borderRadius: '0 0 40% 10%'
    });

    gsap.from(
      '#video-frame',{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius: '0 0 0 0',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#video-frame',
          start: 'center center',
          end: 'bottom center',
          scrub: true,
        }
      }
    )
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">

      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
            <div className='three-body__dot'></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >

              {/* Mini video handler */}
              <video
                ref={miniVideoRef}
                src={getVideoSrc(upcomingVideoIndex)} // Set the thumbnail to next video
                key={upcomingVideoIndex}
                muted
                loop
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex % totalVideos === 0 ? totalVideos : currentIndex % totalVideos
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the MetaGame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
