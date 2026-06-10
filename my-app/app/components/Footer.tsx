import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line
        x1="17.5"
        x2="17.51"
        y1="6.5"
        y2="6.5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* Navigation data */
const SHOP_LINKS = [
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Categories", href: "/categories" },
  { name: "Gift Cards", href: "/gift-cards" },
] as const;

const SERVICES_LINKS = [
  { name: "FAQs", href: "/faqs" },
  { name: "Shipping & Returns", href: "/shipping" },
  { name: "Track Order", href: "/track-order" },
  { name: "Contact Us", href: "/contact" },
] as const;

const COMPANY_LINKS = [
  { name: "About Us", href: "/about" },
  { name: "Career", href: "/career" },
  { name: "Press", href: "/press" },
  { name: "Privacy Policy", href: "/privacy" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: FacebookIcon,
    hoverBg: "hover:bg-[#1877F2]",
    hoverText: "hover:text-white",
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: XIcon,
    hoverBg: "hover:bg-[#0f0f0f]",
    hoverText: "hover:text-white",
  },
  {
    label: "Instagram",
    href: "#",
    icon: InstagramIcon,
    hoverBg: "hover:bg-[#E4405F]",
    hoverText: "hover:text-white",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: LinkedInIcon,
    hoverBg: "hover:bg-[#0A66C2]",
    hoverText: "hover:text-white",
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-[#e0dfd9] bg-[#f6f5f0]">
      {/* Main content */}
      <div className="mx-auto max-w-350 px-4 pt-8 pb-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-3xl font-bold tracking-tight text-[#0f0f0f] transition-opacity hover:opacity-80"
            >
              <span style={{ fontFamily: "var(--font-geist)" }}>flow</span>
              <em
                className="text-[#3B6FE8]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                }}
              >
                cart
              </em>
            </Link>

            {/* Tagline */}
            <p className="mt-3 text-[13px] text-justify leading-relaxed text-[#888] max-w-70">
              A quiet edit of everyday essentials - made by people who care
              deeply about what they make.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <Phone className="h-4 w-4 shrink-0 text-[#aaa]" />
                <a
                  href="tel:+977 9847854321"
                  className="transition-colors hover:text-[#3B6FE8]"
                >
                  +977 9847854321
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#555]">
                <Mail className="h-4 w-4 shrink-0 text-[#aaa]" />
                <a
                  href="mailto:support@flowcart.com"
                  className="transition-colors hover:text-[#3B6FE8]"
                >
                  support@flowcart.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#555]">
                <MapPin className="h-4 w-4 shrink-0 text-[#aaa] mt-0.5" />
                <span>
                  FlowCart Store, 1234 Commerce St,
                  <br />
                  Copenhagen, Denmark
                </span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#aaa] mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-[#0f0f0f]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#aaa] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#555] transition-colors hover:text-[#0f0f0f]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#aaa] mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[#555] transition-colors hover:text-[#0f0f0f]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 border-t border-[#e0dfd9] pt-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <p className="text-[12px] text-[#aaa]">
              © 2026 FlowCart. All Rights Reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-1.5">
              <span className="mr-1.5 text-[11px] uppercase tracking-[0.12em] text-[#aaa]">
                Follow us
              </span>
              {SOCIAL_LINKS.map(
                ({ label, href, icon: Icon, hoverBg, hoverText }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#e0dfd9] bg-white/60 text-[#888] transition-all duration-200 hover:border-transparent hover:scale-105 ${hoverBg} ${hoverText}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
