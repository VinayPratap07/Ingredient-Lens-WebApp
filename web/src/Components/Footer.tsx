import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    solutions: [
      { name: "Skin Analysis", href: "#" },
      { name: "Routine Builder", href: "#" },
      { name: "Ingredient Checker", href: "#" },
      { name: "AI Consultation", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Dermatologists", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
    social: [
      { name: "GitHub", href: "https://github.com", icon: FaGithub },
      { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
      { name: "Twitter", href: "https://twitter.com", icon: FaTwitter },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-[#23483A] via-[#315C4A] to-[#456B57] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand and Description */}
          <div className="space-y-4 md:col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              AI Skincare
            </h2>
            <p className="max-w-sm text-md text-emerald-100/80 leading-relaxed">
              Personalized, data-backed dermatological insights tailored to your
              skin profile using advanced computer vision.
            </p>
            <div className="flex gap-x-5 pt-2">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-emerald-200/70 transition-all duration-200 hover:text-white hover:scale-110"
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links: Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Technology
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-md text-emerald-100/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-md text-emerald-100/70 transition-colors hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-emerald-500/30 pt-6 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-xs text-emerald-200/60">
            &copy; {currentYear} AI Skincare, Inc. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-emerald-200/60 sm:mt-0">
            Precision algorithms. Healthier skin.
          </p>
        </div>
      </div>
    </footer>
  );
}
