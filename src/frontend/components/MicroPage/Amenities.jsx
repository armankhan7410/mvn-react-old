import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Amenities() {
  const [sectionRendered,setSectionRendered] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);
    sectionsRef.current.forEach((section, i) => {
      const bg = section.querySelector('.bg');

      if (bg) {
        bg.style.backgroundImage = `url(https://picsum.photos/1600/800?random=${i})`;

        gsap.fromTo(
          bg,
          {
            backgroundPosition: () =>
              i === 0 ? '50% 0px' : `50% ${-window.innerHeight * getRatio(section)}px`,
          },
          {
            backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRendered ? section : document.getElementsByClassName('parallax')[i],
              start: () => (i === 0 ? 'top top' : 'top bottom'),
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    });
    setSectionRendered(true)
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [sectionRendered]);

  return (
    <div className="main_am">
      <section className='parallax' ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="bg"></div>
        <h1>Simple parallax sections</h1>
      </section>
      <section className='parallax' ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="bg"></div>
        <h1>Hey look, a title</h1>
      </section>
      <section className='parallax' ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="bg"></div>
        <h1>They just keep coming</h1>
      </section>
      <section className='parallax' ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="bg"></div>
        <h1>So smooth though</h1>
      </section>
      <section className='parallax' ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="bg"></div>
        <h1>Nice, right?</h1>
      </section>
    </div>
  );
}
