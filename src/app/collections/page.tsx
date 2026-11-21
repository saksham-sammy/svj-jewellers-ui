import { Suspense } from "react";
import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { CollectionsCatalogClient } from "@/components/CollectionsCatalogClient";
import { Footer } from "@/components/Footer";
import { Overlays } from "@/components/Overlays";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse handcrafted 22K gold jewellery, diamond solitaires, bridal ensembles, earrings, necklaces, rings, bangles, and men's creations by SVJ.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2EA]">
      <AnnouncementBar />
      <Navbar initialTone="dark" />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-24 text-center text-sm text-[#7A7266]">
              Loading SVJ Collections...
            </div>
          }
        >
          <CollectionsCatalogClient />
        </Suspense>
      </main>
      <Footer />
      <Overlays />
    </div>
  );
}
