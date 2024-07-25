import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 md:px-6 py-8 flex items-center justify-between">
        <div className="text-sm text-gray-500">&copy; 2024 CaZa, Inc.</div>
        <nav className="flex items-center gap-6">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
