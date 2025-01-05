import {React, useEffect, useRef, useState} from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

import { useWindowScroll } from 'react-use';

const NavBar = () => {

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);

    const navItem =['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

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
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -transalte-y-1/2'>
            <nav className='flex size-full items-center justify-between padding-4'>
                <div className='flex items-center gap-7'>
                    <img src="/img/logo.png" alt="logo" className='w-10' />

                    <Button
                    id='product-button'
                    title='Products'
                    rightIcon={<TiLocationArrow />}
                    containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                    />
                </div>

                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {navItem.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                {item}
                            </a>
                        ))}
                    </div>

                    <button 
                    className='ml-10 flex item-center space-x-0.5'
                    onClick={toggleAudioIndicator}
                    >
                        {/* responsible for audio indicator, the bar that are bouncing type shi */}
                        <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                key={bar} 
                                className={`indicator-line ${isIndicatorActive ? 'active' :''}`} 
                                style={{ animationDelay : `${bar * 0.1}s`}}
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