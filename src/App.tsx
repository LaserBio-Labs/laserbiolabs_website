import { useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { CataloguePage } from "./components/CataloguePage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { FAQPage } from "./components/FAQPage";
import { ContactPage } from "./components/ContactPage";
import { BlogPage } from "./components/BlogPage";
import { QuoteProvider } from "./components/QuoteContext";
import { QuoteDrawer } from "./components/QuoteDrawer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const location = useLocation();

  const getPageFromPath = (path: string) => {
    if (path.startsWith("/product/")) return "product-detail";
    if (path.startsWith("/blog/")) return "blog";
    switch (path) {
      case "/":
        return "home";
      case "/catalogue":
        return "catalogue";
      case "/faq":
        return "faq";
      case "/contact":
        return "contact";
      case "/blog":
        return "blog";
      default:
        return "home";
    }
  };

  const currentPage = getPageFromPath(location.pathname);

  const productItems = [
    'Matrix Kits',
    'Bulk Matrix',
    'Peptide Calibration Mixtures',
    'Protein Calibration Mixtures',
    'Calibration Kits',
    'Protein Trypsin Digest Kits',
  ];

  const supportItems = [
    'Technical Documentation',
    'Application Notes',
    'Method Development',
    'Customer Support',
    'Training Resources',
  ];

  return (
    <QuoteProvider>
      <div className="min-h-screen bg-background">
        <Navigation
          currentPage={currentPage}
          onPageChange={() => {}} // This will be handled by Links now
          onOpenQuote={() => setIsQuoteDrawerOpen(true)}
        />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onPageChange={() => {}} onPostSelect={() => {}} />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:postId" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <QuoteDrawer
          isOpen={isQuoteDrawerOpen}
          onClose={() => setIsQuoteDrawerOpen(false)}
        />
        <Toaster />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg mb-4">
                  <Link
                    to="/"
                    className="hover:text-white transition-colors"
                  >
                    Laser Bio Labs
                  </Link>
                </h3>
                <p className="text-gray-400 text-sm">
                  Leading manufacturer of precision MALDI-TOF MS
                  calibration standards for research and
                  analytical laboratories worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">Products</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  {productItems.map((item) => (
                    <li key={item}>
                      <Link
                        to="/catalogue"
                        className="hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Support</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  {supportItems.map((item) => (
                    <li key={item}>
                      <Link
                        to={item === 'Customer Support' ? '/contact' : '/faq'}
                        className="hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Contact</h4>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=AREP%20CENTER%201%20traverse%20des%20Brucs%2006560%20Valbonne%20FRANCE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      LaserBio Labs<br/>
                      AREP CENTER 1 traverse des Brucs<br/>
                      06560 Valbonne<br/>FRANCE
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a
                      href="tel:+33984237719"
                      className="hover:text-white transition-colors"
                    >
                      +33 (0) 9 84 23 77 19
                    </a>
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:info@laserbiolabs.com"
                      className="hover:text-white transition-colors"
                    >
                      info@laserbiolabs.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>
                &copy; 2025 LaserBio Labs. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </QuoteProvider>
  );
}