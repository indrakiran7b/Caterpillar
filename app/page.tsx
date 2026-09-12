import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero/Hero";
import { MaterialTransformation } from "@/components/material-transformation/MaterialTransformation";
import { ReverseLogistics } from "@/components/reverse-logistics/ReverseLogistics";
import { Materials } from "@/components/materials/Materials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MaterialTransformation />
      <ReverseLogistics />
      <Materials />
      <section id="pickup" aria-hidden="true" />
    </main>
  );
}
