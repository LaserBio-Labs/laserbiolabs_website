// src/components/Footer.tsx
import { FC } from 'react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export const Footer: FC<FooterProps> = ({ onPageChange }) => {
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg mb-4">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange('home');
                }}
                className="hover:text-white transition-colors"
              >
                Laser Bio Labs
              </a>
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
                  <a
                    href="/catalogue"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange('catalogue');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              {supportItems.map((item) => (
                <li key={item}>
                  <a
                    href={item === 'Customer Support' ? '/contact' : '/faq'}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(item === 'Customer Support' ? 'contact' : 'faq');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
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
  );
};
