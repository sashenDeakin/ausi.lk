import CompanyLogo from "@/components/home/company-logo";
import FeaturesSection from "@/components/home/features-section";
import Hero from "@/components/home/hero-section";
import MonitorSection from "@/components/home/monitor-section";
import Navbar from "@/components/home/navbar";
import PurposeSection from "@/components/home/purpose-section";
import ScheduleSection from "@/components/home/schedule-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection />
        <ScheduleSection />
        <MonitorSection />
      </div>
    </main>
  );
}
