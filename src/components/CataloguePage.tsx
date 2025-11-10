import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productData, productCategories } from '../data/productData';

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

//const productCategories = [
//  'All',
//  'Matrix kits',
//  'Bulk Matrix',
//  'Peptide calibration mixtures',
//  'Protein calibration mixtures',
//  'Calibration kits',
//  'Protein trypsin digest kits'
//];

interface CataloguePageProps {
  onProductSelect?: (productId: string) => void;
}

export function CataloguePage({ onProductSelect }: CataloguePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (productId: string) => {
    if (onProductSelect) {
      onProductSelect(productId);
    }
  };

  const handleOrderInquiry = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const subject = `Order Inquiry - ${product.name} (${product.id})`;
    const body = `Dear Laser Bio Labs,

I would like to inquire about ordering the following product:

Product: ${product.name}
Product ID: ${product.id}
Price: ${product.price}

Please provide information about:
- Availability and lead time
- Shipping costs
- Payment terms
- Technical specifications

Thank you for your assistance.

Best regards,`;

    window.location.href = `mailto:orders@laserbiolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Helper function to strip HTML tags for description display
  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const getShortDescription = (description: string) => {
    const stripped = stripHtml(description);
    return stripped.length > 300 ? stripped.substring(0, 300) + '...' : stripped;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-4 text-gray-900">Product Catalogue</h1>
          <p className="text-xl text-gray-600">
            Comprehensive range of MALDI-TOF MS calibration standards and reagents
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products by Category */}
        {selectedCategory === 'All' ? (
          // Show all productCategories with sections
          <div className="space-y-12">
            {productCategories.filter(cat => cat !== 'All').map(category => {
              const categoryProducts = products.filter(product => product.category === category);
              const filteredCategoryProducts = categoryProducts.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     product.id.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesSearch;
              });

              if (filteredCategoryProducts.length === 0) return null;

              return (
                <div key={category} className="category-section">
                  {/* Category Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">{category}</h2>
                    <div className="w-16 h-1 bg-primary rounded-full"></div>
                    <p className="text-gray-600 mt-3">
                      {productData.find(section => section.section === category)?.text && (
                        stripHtml(productData.find(section => section.section === category)?.text || '')
                      )}
                    </p>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategoryProducts.map((product) => (
                      <Card 
                        key={product.id} 
                        className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <CardContent className="p-4">
                          {/* Product Image */}
                          <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-4">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>

                          {/* Product ID and Price */}
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                              {product.id}
                            </Badge>
                            <div className="text-lg font-medium text-primary">{product.price}</div>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Product Description */}
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {stripHtml(product.description)}
                          </p>

                          {/* Action Button */}
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => handleOrderInquiry(e, product)}
                            className="w-full flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Request Quote
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Show filtered products for specific category
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">{selectedCategory}</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-gray-600 mt-3">
                {productData.find(section => section.section === selectedCategory)?.text && (
                  stripHtml(productData.find(section => section.section === selectedCategory)?.text || '')
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
                  onClick={() => handleProductClick(product.id)}
                >
                  <CardContent className="p-4">
                    {/* Product Image */}
                    <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>

                    {/* Product ID and Price */}
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {product.id}
                      </Badge>
                      <div className="text-lg font-medium text-primary">{product.price}</div>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {stripHtml(product.description)}
                    </p>

                    {/* Action Button */}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleOrderInquiry(e, product)}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}

        {/* Order Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg mb-3 text-gray-900">Ordering Information</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How to Order</h4>
              <ul className="space-y-1">
                <li>• Click on any product to view detailed specifications</li>
                <li>• Use "Request Quote" button to send email inquiry</li>
                <li>• Receive quotation and availability confirmation</li>
                <li>• Complete order via direct bank transfer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Payment & Shipping</h4>
              <ul className="space-y-1">
                <li>• Payment via direct bank transfer</li>
                <li>• Net 30 payment terms for established customers</li>
                <li>• Worldwide shipping available</li>
                <li>• Temperature-controlled shipping when required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
