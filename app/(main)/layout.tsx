import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
import { Link } from "@heroui/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <footer className="w-full bg-default-50 border-t border-divider mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="font-bold text-lg">{siteConfig.name}</span>
              </div>
              <p className="text-default-600 mb-4 max-w-md">
                Complete clinic management solution for modern healthcare
                practices. Streamline your operations and focus on patient care.
              </p>
              <p className="text-sm text-default-500">
                © 2024 ClinicFlow. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/#features"
                    className="text-default-600 hover:text-primary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#pricing"
                    className="text-default-600 hover:text-primary"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-default-600 hover:text-primary"
                  >
                    Free Trial
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={siteConfig.links.support}
                    className="text-default-600 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href={siteConfig.links.privacy}
                    className="text-default-600 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={siteConfig.links.terms}
                    className="text-default-600 hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
