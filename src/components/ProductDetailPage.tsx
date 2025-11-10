import { ArrowLeft, Mail, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productData, productCategoriesDescriptions } from '../data/productData';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  sidetext?: string;
  graph?: string;
  image: string;
}

// Category descriptions
//const productCategoriesDescriptions: Record<string, string> = {
//  "Matrix kits": "MALDI matrix kits contain pre-weighed tubes of recrystallized matrices and adapted solvent mixtures. They provide standard analytical conditions and eliminate the need for cumbersome daily preparation of fresh matrix. Recrystallized and cation-depleted matrix provides higher sensitivity and improved signal-to-noise ratio when compared to non-recrystallized standard product.",
//  "Bulk Matrix": "MALDI matrix kits contain pre-weighed tubes of recrystallized matrices and adapted solvent mixtures. They provide standard analytical conditions and eliminate the need for cumbersome daily preparation of fresh matrix. Recrystallized and cation-depleted matrix provides higher sensitivity and improved signal-to-noise ratio when compared to non-recrystallized standard product.",
//  "Calibration kits": "Our calibration kits contain calibrated peptide and protein mixtures, designed for analytical reproducibility and consistent signal-to-noise ratio, as well as individual calibrants and diluent. They provide reproducible, standard analytical conditions to eliminate the need for cumbersome preparation of calibrant mixtures. They are prepared and conditioned with the highest purity chemicals, in a form adapted to everyday use in the mass spectrometry laboratory.",
//  "Protein trypsin digest kits": "Our protein digests kits contain calibrated peptide mixtures, obtained from controlled trypsin digestion of well characterized proteins. They provide quantified, standardized digests for proteomics and LC-MS applications and eliminate the variability and cumbersome preparation of trypsin digestions. Digests are prepared with pure natural proteins and conditioned, in a form adapted to everyday use in the mass spectrometry lab.",
//  "MALDI imaging solutions": "For perfect results in MALDI imaging experiments, we offer a range of products from highly purified MALDI matrices to ITO-coated slides in various packages. Our dedicated Imaging starter kits provides a specially tailored slide holder and consumables needed to run MALDI imaging experiments, including conductive slides, water-sensitive paper for control of spray conditions, mass calibrants and MALDI matrices."
//};


// Transform the data structure
const products: Product[] = [];
productData.forEach(section => {
  section.products.forEach(product => {
    products.push({
      id: product.title,
      name: product.subtitle,
      category: section.section,
      price: product.price,
      description: product.text,
      sidetext: product.sidetext,
      graph: product.graph,
      image: section.img
    });
  });
});

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl mb-4 text-gray-900">Product Not Found</h1>
            <Button onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalogue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleOrderInquiry = () => {
    const subject = `Order Inquiry - ${product.name} (${product.id})`;
    const body = `Dear Laser Bio Labs,

I would like to inquire about ordering the following product:

Product: ${product.name}
Product ID: ${product.id}
Category: ${product.category}
Price: ${product.price}

Please provide information about:
- Availability and lead time
- Shipping costs
- Payment terms
- Technical specifications
- Certificate of analysis

Thank you for your assistance.

Best regards,`;

    window.location.href = `mailto:orders@laserbiolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownloadDatasheet = () => {
    alert('Datasheet download would be initiated here. Please contact us for technical documentation.');
  };

  // Helper function to extract applications from description
  const getApplications = (description: string) => {
    const applicationsMatch = description.match(/Applications:\s*([^<]*)/i);
    if (applicationsMatch) {
      return applicationsMatch[1].split(',').map(app => app.trim()).filter(app => app.length > 0);
    }
    return [];
  };

  const applications = getApplications(product.description);
  const categoryDescription = productCategoriesDescriptions[product.category];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Catalogue
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm mb-4">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mass Spectrum Graph */}
            {product.graph && (
              <div className="aspect-video rounded-lg overflow-hidden bg-white shadow-sm">
                <ImageWithFallback
                  src={product.graph}
                  alt={`Mass spectrum for ${product.name}`}
                  className="w-full h-full object-cover"
                />
                <p className="text-sm text-gray-500 text-center mt-2">Representative mass spectrum</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.id}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl mb-4 text-gray-900">{product.name}</h1>
            </div>

            {/* Pricing and Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-3xl font-medium text-primary">{product.price}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>In Stock</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={handleOrderInquiry} className="w-full" size="lg">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadDatasheet} 
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Datasheet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Storage Information */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Storage & Handling</h4>
                    <p className="text-sm text-gray-600">
                      Store at recommended temperature. Handle with appropriate laboratory safety protocols.
                      Detailed storage conditions provided with each shipment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-8">
          {/* Description Section */}
          <Card>
            <CardHeader>
              <CardTitle>Product Description</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Category Description */}
              {categoryDescription && (
                <>
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">About {product.category}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {categoryDescription}
                    </p>
                  </div>
                  <Separator className="my-6" />
                </>
              )}
              
              {/* Product-specific Description */}
              <div 
                className="text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              
              {applications.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Applications</h4>
                    <div className="grid gap-2">
                      {applications.map((application, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Composition Section */}
          {product.sidetext && (
            <Card>
              <CardHeader>
                <CardTitle>Product Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="bg-gray-50 rounded-lg p-4 mb-6"
                  dangerouslySetInnerHTML={{ __html: product.sidetext }}
                />
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Quality Assurance</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    All products are manufactured under ISO-certified conditions and undergo rigorous quality control testing.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• HPLC analysis for purity verification</li>
                    <li>• Mass spectrometry validation</li>
                    <li>• Comprehensive certificate of analysis</li>
                    <li>• Batch-to-batch consistency testing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Support Section */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Support & Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• Product datasheet</li>
                      <li>• Certificate of analysis</li>
                      <li>• Preparation protocols</li>
                      <li>• MSDS/Safety information</li>
                    </ul>
                    <Button variant="outline" size="sm" onClick={handleDownloadDatasheet}>
                      Download Documents
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Expert Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get help from our mass spectrometry experts for method development and troubleshooting.
                    </p>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.location.href = 'mailto:support@laserbiolabs.com?subject=Technical Support Request'}
                      >
                        Email Support
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.location.href = 'mailto:support@laserbiolabs.com?subject=Consultation Request'}
                      >
                        Schedule Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Quality Guarantee</h4>
                <p className="text-sm text-gray-600">
                  All products come with comprehensive certificates of analysis and are backed by our quality guarantee. 
                  If you experience any issues with product performance, please contact us immediately for resolution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
