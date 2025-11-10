import { Microscope, Award, Users, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onPostSelect: (postId: string) => void;
}

export function HomePage({ onPageChange, onPostSelect }: HomePageProps) {
  const features = [
    {
      icon: Microscope,
      title: 'Precision Calibration',
      description: 'High-quality MALDI-TOF MS calibration standards for accurate mass spectrometry results.'
    },
    {
      icon: Award,
      title: 'Proven Quality',
      description: 'ISO-certified products trusted by laboratories worldwide for consistent performance.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Technical expertise and customer support from experienced mass spectrometry professionals.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving research institutions and commercial laboratories across the globe.'
    }
  ];

  const trustedClients = [
    {
      id: 'pharmatech-calibration-breakthrough',
      name: 'PharmaTech Solutions',
      category: 'Pharmaceutical',
      image: 'https://images.unsplash.com/photo-1719319384332-82f969b6e48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGNvbXBhbnklMjBsb2dvfGVufDF8fHx8MTc1NjAyODIyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'academic-research-excellence',
      name: 'University Research Lab',
      category: 'Academic',
      image: 'https://images.unsplash.com/photo-1602052577122-f73b9710adba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2glMjBsYWJvcmF0b3J5fGVufDF8fHx8MTc1NTkyNTk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'biotech-standardization-success',
      name: 'BioInnovate Corp',
      category: 'Biotechnology',
      image: 'https://images.unsplash.com/photo-1718741129015-48ef97da675c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW90ZWNoJTIwY29tcGFueSUyMG9mZmljZXxlbnwxfHx8fDE3NTYwMjgyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'clinical-compliance-achievement',
      name: 'Medical Research Institute',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBpbnN0aXR1dGV8ZW58MXx8fHwxNzU2MDI4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'clinical-diagnostics-efficiency',
      name: 'Clinical Diagnostics Lab',
      category: 'Clinical',
      image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGluaWNhbCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU2MDI4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'startup-success-story',
      name: 'SciTech Analytics',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1581094481644-f2ab64522498?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGVjaG5vbG9neSUyMGNvbXBhbnl8ZW58MXx8fHwxNzU2MDI4MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl mb-6 text-gray-900">
                Precision MALDI-TOF MS Calibration Standards
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Leading manufacturer of high-quality calibration kits for MALDI mass spectrometry. 
                Trusted by laboratories worldwide for accurate and reliable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onPageChange('catalogue')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  View Catalogue
                </Button>
                <Button 
                  onClick={() => onPageChange('contact')}
                  variant="outline" 
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="lg:order-2">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop"
                alt="Mass spectrometry laboratory equipment"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 text-gray-900">Why Choose Laser Bio Labs?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the highest quality calibration standards with unmatched precision and reliability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Laboratory scientist working"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">About Laser Bio Labs</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over a decade of experience in mass spectrometry, Laser Bio Labs has been at the 
                forefront of developing precision calibration standards for MALDI-TOF MS applications.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team of scientists and engineers work tirelessly to ensure that every calibration 
                kit meets the highest standards of quality and precision, enabling researchers and 
                analysts worldwide to achieve accurate and reproducible results.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From pharmaceutical research to clinical diagnostics, our calibration standards are 
                trusted by leading institutions globally for their reliability and consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* They Trust Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-4 text-gray-900">They Trust Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading organizations worldwide rely on our calibration standards for their critical research and analysis. Click to read their success stories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {trustedClients.map((client, index) => (
              <div key={index} className="group">
                <div 
                  className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square cursor-pointer"
                  onClick={() => onPostSelect(client.id)}
                >
                  <ImageWithFallback
                    src={client.image}
                    alt={`${client.name} - ${client.category}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white group-hover:text-gray-900 transition-colors duration-300">
                      <div className="text-sm font-medium px-2">{client.name}</div>
                      <div className="text-xs opacity-80 px-2">{client.category}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-medium">
                      View Case Study
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Join hundreds of leading organizations who trust Laser Bio Labs for their mass spectrometry calibration needs
            </p>
            <Button 
              onClick={() => onPageChange('contact')}
              variant="outline"
              size="lg"
            >
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-6">Ready to Enhance Your MS Accuracy?</h2>
          <p className="text-xl mb-8 opacity-90">
            Explore our comprehensive catalogue of MALDI-TOF calibration standards
          </p>
          <Button 
            onClick={() => onPageChange('catalogue')}
            variant="secondary"
            size="lg"
          >
            Browse Products
          </Button>
        </div>
      </section>
    </div>
  );
}