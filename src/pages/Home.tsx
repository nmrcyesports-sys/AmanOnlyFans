import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import EditorialIntro from '../components/EditorialIntro';
import ProfileStory from '../components/ProfileStory';
import PsychoIdentity from '../components/PsychoIdentity';
import VisualStory from '../components/VisualStory';
import Highlights from '../components/Highlights';
import InstagramSection from '../components/InstagramSection';
import OtherProfile from '../components/OtherProfile';
import SocialConnect from '../components/SocialConnect';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="w-full bg-[#F7F5F0]">
      <Navbar />
      <Hero />
      <Stats />
      <EditorialIntro />
      <ProfileStory />
      <PsychoIdentity />
      <VisualStory />
      <Highlights />
      <InstagramSection />
      <OtherProfile />
      <SocialConnect />
      <FinalCTA />
      <Footer />
    </div>
  );
}
