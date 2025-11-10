import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { CataloguePage } from "./components/CataloguePage";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { FAQPage } from "./components/FAQPage";
import { ContactPage } from "./components/ContactPage";
import { BlogPage } from "./components/BlogPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState<
    string | null
  >(null);
  const [selectedPostId, setSelectedPostId] = useState<
    string | null
  >(null);

  const navigate = (page: string, options: { productId?: string; postId?: string } = {}) => {
    setCurrentPage(page);
    setSelectedProductId(options.productId || null);
    setSelectedPostId(options.postId || null);

    const state = { page, productId: options.productId, postId: options.postId };
    let path = '/';
    if (page === 'home') {
      path = '/';
    } else if (page === 'product-detail') {
      path = `/product/${options.productId || ''}`;
    } else if (page === 'blog' && options.postId) {
      path = `/blog/${options.postId}`;
    } else {
      path = `/${page}`;
    }

    window.history.pushState(state, '', path);
  };

  const parseAndSetFromUrl = () => {
    let pathname = window.location.pathname.toLowerCase();
    if (pathname === '/' || pathname === '') {
      setCurrentPage('home');
      return;
    }
    if (pathname.startsWith('/')) pathname = pathname.slice(1);

    const parts = pathname.split('/');
    switch (parts[0]) {
      case 'home':
        setCurrentPage('home');
        break;
      case 'catalogue':
        setCurrentPage('catalogue');
        break;
      case 'product':
        if (parts.length > 1 && parts[1]) {
          setSelectedProductId(parts[1]);
          setCurrentPage('product-detail');
        } else {
          setCurrentPage('home');
        }
        break;
      case 'blog':
        if (parts.length > 1 && parts[1]) {
          setSelectedPostId(parts[1]);
          setCurrentPage('blog');
        } else {
          setCurrentPage('blog');
        }
        break;
      case 'faq':
        setCurrentPage('faq');
        break;
      case 'contact':
        setCurrentPage('contact');
        break;
      default:
        setCurrentPage('home');
        break;
    }
  };

  useEffect(() => {
    parseAndSetFromUrl();
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setCurrentPage(event.state.page || 'home');
        setSelectedProductId(event.state.productId || null);
        setSelectedPostId(event.state.postId || null);
      } else {
        parseAndSetFromUrl();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleProductSelect = (productId: string) => {
    navigate('product-detail', { productId });
  };

  const handleBackToCatalogue = () => {
    navigate('catalogue');
  };

  const handlePostSelect = (postId: string) => {
    navigate('blog', { postId });
  };

  const handleBackToBlog = () => {
    navigate('blog');
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onPageChange={(page) => navigate(page)}
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
            onPageChange={(page) => navigate(page)}
            onPostSelect={handlePostSelect}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onPageChange={(page) => navigate(page)}
      />
      <main>{renderPage()}</main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">Laser Bio Labs</h3>
              <p className="text-gray-400 text-sm">
                Leading manufacturer of precision MALDI-TOF MS
                calibration standards for research and
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
                  <p>LaserBio Labs<br/>
                  AREP CENTER 1 traverse des Brucs<br/>
                  06560 Valbonne<br/>FRANCE
                  </p>
                </p>
                <p>Phone: +33 (0)  9 84 23 77 19</p>
                <p>Email: info@laserbiolabs.com</p>
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
  );
}
