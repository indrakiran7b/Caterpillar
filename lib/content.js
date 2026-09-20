export const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product", href: "/#product" },
  { label: "FAQ", href: "/#faq" },
];

export const footerQuickLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Product", href: "/#product" },
  { label: "FAQ", href: "/#faq" },
];

export const serviceArea = "Bengaluru";

export const valueProps = [
  {
    title: "Doorstep pickup",
    description: "You don’t have to haul recyclables anywhere.",
  },
  {
    title: "Transparent weighing",
    description: "You see what was collected before you’re paid.",
  },
  {
    title: "Payment",
    description: "You’re paid for the materials that were collected.",
  },
];

export const howItWorks = [
  {
    num: "01",
    title: "Book",
    description: "Tell us what you’re selling and where to collect it.",
  },
  {
    num: "02",
    title: "Pickup",
    description: "A pickup partner comes to your address.",
  },
  {
    num: "03",
    title: "Weigh",
    description: "Materials are weighed during the visit.",
  },
  {
    num: "04",
    title: "Get paid",
    description: "Payment is completed after the pickup.",
  },
];

export const productScreens = [
  {
    id: "book",
    label: "Book a pickup",
    title: "Book a pickup",
    description: "Choose materials and book a pickup.",
  },
  {
    id: "confirm",
    label: "Manage your request",
    title: "Manage your request",
    description: "Review pickup details in the app.",
  },
  {
    id: "complete",
    label: "Complete your pickup",
    title: "Complete your pickup",
    description: "See the finished pickup in the app.",
  },
];

export const faqGroups = [
  {
    label: "About",
    items: [
      {
        question: "What is CaterPillar?",
        answer:
          "CaterPillar is a platform building a simpler way to connect households with doorstep collection services for recyclable materials.",
      },
      {
        question: "Where is CaterPillar currently available?",
        answer:
          "CaterPillar is currently focused on Bengaluru, India, as we build and expand our collection network.",
      },
      {
        question: "What materials does CaterPillar collect?",
        answer:
          "The materials accepted by CaterPillar are currently being finalized. Available collection categories will be offered on the platform as the service develops.",
      },
      {
        question: "Do I need to sort my materials?",
        answer:
          "Select the categories you’re handing over when you book. Those are the materials collected at your address.",
      },
    ],
  },
  {
    label: "Booking",
    items: [
      {
        question: "How do I book a pickup?",
        answer:
          "You can request a pickup through the CaterPillar platform by providing your pickup location and the relevant collection details.",
      },
      {
        question: "Is there a doorstep pickup fee?",
        answer:
          "Currently, CaterPillar does not charge a doorstep pickup fee. This may change as our services and operations expand.",
      },
      {
        question: "Can I cancel my pickup?",
        answer:
          "Yes. You can cancel your pickup through the CaterPillar platform, subject to the applicable cancellation process.",
      },
    ],
  },
  {
    label: "Payment",
    items: [
      {
        question: "How are material prices determined?",
        answer:
          "The value of accepted materials is based on the applicable fixed rates and the final materials assessed during collection.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Payment is completed in the CaterPillar app after your materials are collected.",
      },
      {
        question: "What happens if my materials are different from my booking?",
        answer:
          "The collection partner may update the material details during pickup. Any accepted additional materials may be included when determining the final value.",
      },
    ],
  },
  {
    label: "Partners",
    items: [
      {
        question: "How do I become a pickup partner?",
        answer:
          "You can express your interest in partnering with CaterPillar through our Partner App or partner registration process. We will share further details based on availability and operational requirements.",
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);
