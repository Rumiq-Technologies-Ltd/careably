import { PartnerCtaBand } from "@/components/shared/PartnerCtaBand"
import { Difference } from "@/features/home/components/Difference"
import { EldersmilesCard } from "@/features/home/components/EldersmilesCard"
import { Hero } from "@/features/home/components/Hero"
import { ServicesOverview } from "@/features/home/components/ServicesOverview"
import { WhoWeServe } from "@/features/home/components/WhoWeServe"
import { WhyCareably } from "@/features/home/components/WhyCareably"

/**
 * Section order follows the client's approved design. "Who We Serve" is the
 * one addition: it comes from the client's HTML scaffold and gives the
 * "For Communities" nav item a real destination.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Difference />
      <WhyCareably />
      <WhoWeServe />
      <EldersmilesCard />
      <PartnerCtaBand />
    </>
  )
}
