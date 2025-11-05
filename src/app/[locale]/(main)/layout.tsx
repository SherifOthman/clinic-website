import { Footer } from "@/src/components/Footer";
import { Navbar } from "@/src/components/Navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-4">{children}</main>
      <Footer />
    </div>
  );
}
