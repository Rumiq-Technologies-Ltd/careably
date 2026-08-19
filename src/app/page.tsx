import { PartnerCtaBand } from "@/components/shared/PartnerCtaBand"
import { Hero } from "@/features/home/components/Hero"
import { NetworkServices } from "@/features/home/components/NetworkServices"
import { ServicesOverview } from "@/features/home/components/ServicesOverview"
import { WhoWeServe } from "@/features/home/components/WhoWeServe"
import { WhyCareably } from "@/features/home/components/WhyCareably"

/**
 * The design's "Careably Difference" section, with its ecosystem diagram, has
 * been removed at the client's request, and "What We Do" went with it.
 *
 * `NetworkServices` takes its place: the categories above say what kinds of
 * service exist, this says who actually delivers them today.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <NetworkServices />
      <WhyCareably />
      <WhoWeServe />
      <PartnerCtaBand />
    </>
  )
}
