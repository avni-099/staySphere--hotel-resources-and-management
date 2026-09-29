import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import FeaturedRooms from "@/components/public/FeaturedRooms";
import FacilitiesSection from "@/components/public/FacilitiesSection";
import AboutSection from "@/components/public/AboutSection";
import GallerySection from "@/components/public/GallerySection";
import WhyChooseSection from "@/components/public/why-choose-section";
import GuestReviews from "@/components/public/GuestReviews";
import BookingCTA from "@/components/public/BookingCTA";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <FeaturedRooms />

         <FacilitiesSection />

         <AboutSection />

         <GallerySection/>

         <WhyChooseSection />

         <GuestReviews/>

         <BookingCTA />

         <ContactSection />

         <Footer/>

      </main>
    </>
  );
}