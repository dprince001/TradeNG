import Link from "next/link";
import Container from "@/app/components/layout/Container";

const footerColumns = [
  {
    heading: "Marketplace",
    links: [
      { label: "Browse Listings", href: "/#listings" },
      { label: "Categories", href: "/#categories" },
      { label: "Sell an Item", href: "/list-item" },
      { label: "Top Sellers", href: "/#top-sellers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Support", href: "/contact" },
      { label: "Dispute Center", href: "/dispute-center" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About TradeNG", href: "/about" },
      { label: "Escrow Protection", href: "/escrow-protection" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const SiteFooter = () => {
  return (
    <footer className="hidden md:block bg-white border-t border-gray-100 mt-12">
      <Container className="py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <span className="text-text-primary font-bold text-lg tracking-tight">
            Trade<span className="text-primary">NG</span>
          </span>
          <p className="text-text-secondary text-sm mt-3 max-w-[240px]">
            A safe, secure peer-to-peer marketplace with escrow-protected payments.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-text-primary text-sm font-semibold mb-3.5">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-gray-100">
        <Container className="py-5 text-text-secondary text-xs text-center">
          © {new Date().getFullYear()} TradeNG. All rights reserved.
        </Container>
      </div>
    </footer>
  );
};

export default SiteFooter;
