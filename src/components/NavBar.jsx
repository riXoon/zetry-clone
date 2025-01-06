import {React, useEffect, useRef, useState} from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';


const NavBar = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const navItem =['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const {y:currentScrollY} = useWindowScroll();
    
    useEffect(() => {
      if(!navContainerRef.current) return;

      if(currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
      } else if(currentScrollY > lastScrollY){
        setIsNavVisible(false);
        navContainerRef.current.classList.add('floating-nav');
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current.classList.add('floating-nav');
      }

      setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
      gsap.to( navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      })
    })


    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);

        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
         if(isAudioPlaying) {
            audioElementRef.current.play();
         } else {
            audioElementRef.current.pause();
         }
    }, [isAudioPlaying]);

  return (
    <div
    ref={navContainerRef}
    className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
  >
    <header className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
      <nav className="flex items-center justify-between px-4 h-full">
        {/* Left section */}
        <div className="flex items-center gap-7">
          <img src="/img/logo.png" alt="logo" className="w-10" />
  
          <Button
            id="product-button"
            title="Products"
            rightIcon={<TiLocationArrow />}
            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
          />
        </div>
  
        {/* Center section (nav items) */}
        <div className="hidden md:flex gap-6">
          {navItem.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-hover-btn"
            >
              {item}
            </a>
          ))}
        </div>
  
        {/* Right section */}
        <div className="flex items-center">
          <button
            className="ml-10 flex items-center space-x-0.5"
            onClick={toggleAudioIndicator}
          >
            {/* Audio indicator */}
            <audio
              ref={audioElementRef}
              className="hidden"
              src="/audio/loop.mp3"
              loop
            />
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`indicator-line ${
                  isIndicatorActive ? "active" : ""
                }`}
                style={{ animationDelay: `${bar * 0.1}s` }}
              />
            ))}
          </button>
        </div>
      </nav>
    </header>
  </div>
  
  )
}

export default NavBar