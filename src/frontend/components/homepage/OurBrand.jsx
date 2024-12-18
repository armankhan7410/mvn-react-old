import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SecTitle from "../../../common/SecTitle/Index";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import commitmentIcon from '../../assets/images/icons/brand/commitment.jpg';
import excellenceIcon from '../../assets/images/icons/brand/excellence.jpg';
import customizedIcon from '../../assets/images/icons/brand/customized.jpg';
import MobilebrandBG from '../../assets/images/brand/bg_sm.webp';
import DesktopbrandBG from '../../assets/images/brand/bg-sm-2.png';

gsap.registerPlugin(ScrollTrigger);

const brandData = [
  {
    title: 'Commitment',
    para: `MVN develops and heightens competencies that show a realtor's dedication to code of Ethics & Standards of Practice.`,
    icon: commitmentIcon
  },
  {
    title: 'Excellence',
    para: `We deliver our clients with quality services and aim to exceed expectations in everything we offer.`,
    icon: excellenceIcon
  },
  {
    title: 'Customized Solutions',
    para: `We offer customer-focused solutions with a high level of accountability, and offer the highest level of honesty and expertise.`,
    icon: customizedIcon
  }
];

const OurBrand = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateView = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Listen for window resize to update the image
    window.addEventListener("resize", updateView);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  const titleRef = useRef();
  const dataRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
        }
      });

      dataRefs.current.forEach((singleRef, index) => {
        if (singleRef) {
          gsap.from(singleRef, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: singleRef,
              start: "top 95%",
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section our_brand_section">
      <LazyLoad>
        <img
          src={isMobile ? MobilebrandBG : DesktopbrandBG}
          alt="mvn brand-bg"
          className="brand_bg"
        />
      </LazyLoad>

      <Container>
        <SecTitle className="text-center color style1">
          <h4 ref={titleRef} className="title">Our Brand Ethos</h4>
        </SecTitle>

        <div className="brand_content">
          <Row>
            {brandData?.map((item, index) => (
              <Col key={index} xs={12} md={4} lg={4} className="single_col">
                <div ref={(el) => (dataRefs.current[index] = el)} className="single">
                  <div className="icon">
                    <img src={item.icon} alt="mvn brand icon" className="img-fluid" />
                  </div>

                  <div className="content">
                    <h4 className="title">{item.title}</h4>
                    <p>{item.para}</p>
                    {/* <Link to="#" className="link">Read More</Link> */}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default OurBrand;
