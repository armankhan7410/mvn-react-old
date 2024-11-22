import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Rendersss = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [sectionRendered,setSectionRendered] = useState(false);

  const slides = [
    {
      title: "Slide 1",
      content: "This is the first slide.",
      thumbnail: "https://swiperjs.com/demos/images/nature-1.jpg",
    },
    {
      title: "Slide 2",
      content: "This is the second slide.",
      thumbnail: "https://swiperjs.com/demos/images/nature-2.jpg",
    },
    {
      title: "Slide 3",
      content: "This is the third slide.",
      thumbnail: "https://swiperjs.com/demos/images/nature-3.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const totalSlides = slides.length;

    // ScrollTrigger for the pinned section
    // if(sectionRendered)
    ScrollTrigger.create({
      trigger: sectionRendered ? section : document.getElementById('renders'),
      start: "top top",
      end: `+=${section.offsetHeight * totalSlides}`,
      pin: true,
      scrub: true,
      // markers: true, // Enable for debugging
      onUpdate: (self) => {
        // Calculate the active slide index based on progress
        const index = Math.floor(self.progress * totalSlides);
        setActiveIndex(index);
      },
    });
    setSectionRendered(true)
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  },[slides.length,sectionRendered]);

  // useEffect(() => {
  //   let scrollFunction = () => {
  //     setScrollY(window.scrollY);
  //     console.log(window.scrollY);
  //   };
  //   window.addEventListener("scroll", scrollFunction);
  //   return () => window.removeEventListener("scroll", scrollFunction);
  // }, []);

  return (
    <section className="render_section" id="renders" ref={sectionRef}>
      <Container className="topContainer">
        <h4 className="text-center">Renders</h4>
        <div className="slider-container">
          {/* Large Slides */}
          <div className="slides">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === activeIndex ? "active" : ""}`}
              >
                <h1>{slide.title}</h1>
                <p>{slide.content}</p>
              </div>
            ))}
          </div>

          {/* Thumbnails */}
          <div className="thumbnails">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`thumbnail ${index === activeIndex ? "active" : ""}`}
                onClick={() => {
                  gsap.to(window, {
                    scrollTo: {
                      y:
                        sectionRef.current.offsetTop +
                        index * window.innerHeight,
                    },
                    duration: 1,
                  });
                  setActiveIndex(index);
                }}
              >
                <div className="thum_in w-100">
                  <div className="rounded_div">
                    <img
                      className="rounded_img"
                      src={slide.thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                  <span>{slide.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Rendersss;
