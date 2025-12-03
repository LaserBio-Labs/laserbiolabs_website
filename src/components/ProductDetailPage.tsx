import {
  ArrowLeft,
  Mail,
  Download,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useQuote } from "./QuoteContext";
import { toast } from "sonner";
import {
  productData,
  productCategoriesDescriptions,
} from "../data/productData";
import { useParams, useNavigate } from "react-router-dom";

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
productData.forEach((section) => {
  section.products.forEach((product) => {
    products.push({
      id: product.title,
      name: product.subtitle,
      category: section.section,
      price: product.price,
      description: product.text,
      sidetext: product.sidetext,
      graph: product.graph,
      image: section.img,
    });
  });
});

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === productId);
  const { addItem } = useQuote();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl mb-4 text-gray-900">
              Product Not Found
            </h1>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalogue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToQuote = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    });
    toast.success(`Added ${product.name} to quote`);
  };

  const handleDownloadDatasheet = () => {
    alert(
      "Datasheet download would be initiated here. Please contact us for technical documentation.",
    );
  };

  // Helper function to extract applications from description
  const getApplications = (description: string) => {
    const applicationsMatch = description.match(
      /Applications:\s*([^<]*)/i,
    );
    if (applicationsMatch) {
      return applicationsMatch[1]
        .split(",")
        .map((app) => app.trim())
        .filter((app) => app.length > 0);
    }
    return [];
  };

  const applications = getApplications(product.description);
  const categoryDescription =
    productCategoriesDescriptions[product.category];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
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
                <p className="text-sm text-gray-500 text-center mt-2">
                  Representative mass spectrum
                </p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.id}</Badge>
                <Badge variant="outline">
                  {product.category}
                </Badge>
              </div>
              <h1 className="text-3xl mb-4 text-gray-900">
                {product.name}
              </h1>
            </div>

            {/* Actions and Availability */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <span>In Stock</span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleAddToQuote}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Quote
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
                    <h4 className="font-medium text-gray-900 mb-1">
                      Storage & Handling
                    </h4>
                    <p className="text-sm text-gray-600">
                      Store at recommended temperature. Handle
                      with appropriate laboratory safety
                      protocols. Detailed storage conditions
                      provided with each shipment.
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
                    <h4 className="font-medium text-gray-900 mb-2">
                      About {product.category}
                    </h4>
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
                dangerouslySetInnerHTML={{
                  __html: product.description,
                }}
              />

              {applications.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">
                      Applications
                    </h4>
                    <div className="grid gap-2">
                      {applications.map(
                        (application, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              {application}
                            </span>
                          </div>
                        ),
                      )}
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
                  dangerouslySetInnerHTML={{
                    __html: product.sidetext,
                  }}
                />

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Quality Assurance
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    All products are manufactured under
                    ISO-certified conditions and undergo
                    rigorous quality control testing.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • HPLC analysis for purity verification
                    </li>
                    <li>• Mass spectrometry validation</li>
                    <li>
                      • Comprehensive certificate of analysis
                    </li>
                    <li>
                      • Batch-to-batch consistency testing
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Support Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                Technical Support & Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• Product datasheet</li>
                      <li>• Certificate of analysis</li>
                      <li>• Preparation protocols</li>
                      <li>• MSDS/Safety information</li>
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadDatasheet}
                    >
                      Download Documents
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Expert Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Get help from our mass spectrometry
                      experts for method development and
                      troubleshooting.
                    </p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          (window.location.href =
                            "mailto:info@laserbiolabs.com?subject=Technical Support Request")
                        }
                      >
                        Email Support
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          (window.location.href =
                            "mailto:info@laserbiolabs.com?subject=Consultation Request")
                        }
                      >
                        Schedule Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Quality Guarantee
                </h4>
                <p className="text-sm text-gray-600">
                  All products come with comprehensive
                  certificates of analysis and are backed by our
                  quality guarantee. If you experience any
                  issues with product performance, please
                  contact us immediately for resolution.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}