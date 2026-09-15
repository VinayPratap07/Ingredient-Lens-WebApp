import HeroSection from "../Components/HeroSection";
import PromoSection from "../Components/PromoSection";
import UploadImage from "../Components/UploadImage";
import WorkingSection from "../Components/WorkingSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <UploadImage />
      <PromoSection />
      <WorkingSection />
    </div>
  );
}
