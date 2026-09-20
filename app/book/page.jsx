import BookingFlow from "@/components/booking/BookingFlow";
import BookingHeader from "@/components/booking/BookingHeader";
import Container from "@/components/Container";

export const metadata = {
  title: "Book a Pickup",
  description:
    "Request a doorstep recycling pickup in Bengaluru. Choose your materials, share your address, and a preferred time.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book a Pickup — CaterPillar",
    description:
      "Request a doorstep recycling pickup in Bengaluru. Choose your materials, share your address, and a preferred time.",
    url: "/book",
  },
};

export default function BookPage() {
  return (
    <>
      <BookingHeader />
      <main id="main" className="bg-canvas py-12 pb-24 md:py-16 md:pb-16 lg:py-20">
        <Container>
          <BookingFlow />
        </Container>
      </main>
    </>
  );
}
