import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CollectionsSection } from "@/components/CollectionsSection";
import { BrandStorySection } from "@/components/BrandStorySection";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import { EditorialCampaignBanner } from "@/components/EditorialCampaignBanner";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SocialGallerySection } from "@/components/SocialGallerySection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { Overlays } from "@/components/Overlays";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2EA]">
      <AnnouncementBar />
      <Navbar initialTone="dark" />
      <main className="flex-1">
        <HeroSection />
        <CollectionsSection />
        <BrandStorySection />
        <FeaturedProductsSection />
        <EditorialCampaignBanner />
        <CraftsmanshipSection />
        <TestimonialsSection />
        <SocialGallerySection />
        <NewsletterSection />
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}
