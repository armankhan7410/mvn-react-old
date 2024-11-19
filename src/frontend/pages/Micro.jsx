import React, { Suspense } from "react";
import MicroHero from "../components/MicroPage/Hero";
import MicroOverview from "../components/MicroPage/Overview";
import MicroHighlights from "../components/MicroPage/Highlights";
import MicroPrice from "../components/MicroPage/Price";
import MicroAmenities from "../components/MicroPage/Amenities";
import MicroMasterPlan from "../components/MicroPage/MasterPlan";
import MicroFloorPlan from "../components/MicroPage/FloorPlan";
import MicroLocationMap from "../components/MicroPage/LocationMap";
import Enquire from "../components/homepage/Enquire";
import EnquireForm from "../components/homepage/EnquireForm";
import PeacockSection from "../components/MicroPage/PeacockSection";
import Video2 from "../components/MicroPage/Video2";
import Video3 from "../components/MicroPage/Video3";
import MasterBedroom from "../components/MicroPage/MasterBedroom";



const MicroPage = ({ data }) => {
  console.log('data vdo', data.video1);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <MicroHero data={data} />
        <MicroOverview data={data} />
        {
          data.video1.isVdo === true &&
          <PeacockSection data={data} />
        }
        {
          data.video2.isVdo === true &&
          <Video2 data={data} />
        }
        {
          data.video3.isVdo === true &&
          <Video3 data={data} />
        }
        <MasterBedroom data={data} />
        <MicroHighlights />
        <MicroPrice />
        <MicroAmenities />
        <MicroMasterPlan />
        <MicroFloorPlan />
        <MicroLocationMap />
        <Enquire />
        <EnquireForm />
      </Suspense>
    </>
  )
}

export default MicroPage