import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<
    string | null
  >(null);
  const [selectedPostId, setSelectedPostId] = useState<
    string | null
  >(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] =
    useState(false);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage("product-detail");
  };

  const handleBackToCatalogue = () => {
    setSelectedProductId(null);
    setCurrentPage("catalogue");
  };

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage("blog");
  };

  const handleBackToBlog = () => {
    setSelectedPostId(null);
    setCurrentPage("blog");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onPostSelect={handlePostSelect}
          />
        );
      case "catalogue":
        return (
          <CataloguePage
            onProductSelect={handleProductSelect}
          />
        );
      case "product-detail":
        return selectedProductId ? (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={handleBackToCatalogue}
          />
        ) : (
          <CataloguePage
            onProductSelect={handleProductSelect}
          />
        );
      case "blog":
        return (
          <BlogPage
            postId={selectedPostId}
            onBack={handleBackToBlog}
            onPostSelect={handlePostSelect}
          />
        );
      case "faq":
        return <FAQPage />;
      case "contact":
        return <ContactPage />;
      default:
        return (
          <HomePage
            onPageChange={setCurrentPage}
            onPostSelect={handlePostSelect}
          />
        );
    }
  };

  return (
    <QuoteProvider>
      <div className="min-h-screen bg-background">
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onOpenQuote={() => setIsQuoteDrawerOpen(true)}
        />
        <main>{renderPage()}</main>

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
                <h3 className="text-lg mb-4">LaserBio Labs</h3>
                <p className="text-gray-400 text-sm">
                  Leading manufacturer of precision MALDI-TOF
                  consumables and standards for research and
                  analytical laboratories worldwide.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-4">Products</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>Matrix Kits</li>
                  <li>Bulk Matrix</li>
                  <li>Peptide Calibration Mixtures</li>
                  <li>Protein Calibration Mixtures</li>
                  <li>Calibration Kits</li>
                  <li>Protein Trypsin Digest Kits</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4">Support</h4>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>Technical Documentation</li>
                  <li>Application Notes</li>
                  <li>Method Development</li>
                  <li>Customer Support</li>
                  <li>Training Resources</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4">Contact</h4>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>
                    LaserBio Labs
                    <br />
                    AREP Center, 1 Traverse des Brucs
                    <br />
                    06560 Valbonne, France
                  </p>
                  <p>Phone: +33 (0)9 84 23 77 19</p>
                  <p>Email: info@laserbiolabs.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>
                &copy; 2025 LaserBio Labs. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </QuoteProvider>
  );
}