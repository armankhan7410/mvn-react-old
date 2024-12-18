import Header from "./Header";
import Footer from "./Footer";

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from "react-router-dom";
import { useEffect } from "react";


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Layout = ({children})=>{

  useEffect(()=>{
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,// how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 1.4, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })

    return ()=>{
      smoother.kill();
    }
  }, [])

  return(
    <>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {children}
          {/* <Outlet /> */}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout;