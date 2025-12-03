import { X, Mail, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useQuote } from './QuoteContext';
import { toast } from 'sonner@2.0.3';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuoteFormData {
  institution: string;
  department: string;
  billingAddress: string;
  shippingAddress: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  vatNumber: string;
}

export function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const { items, removeItem, updateQuantity, clearQuote, totalItems } = useQuote();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    institution: '',
    department: '',
    billingAddress: '',
    shippingAddress: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    vatNumber: '',
  });

  // Helper function to calculate total price for an item
  const calculateItemTotal = (price: string, quantity: number): string => {
    // Extract number and currency from price string (e.g., "135 €" or "€135")
    const match = price.match(/(\d+(?:\.\d+)?)\s*(€|EUR|\$|USD)?|(€|EUR|\$|USD)\s*(\d+(?:\.\d+)?)/);
    if (match) {
      const numericValue = parseFloat(match[1] || match[4]);
      const currency = match[2] || match[3] || '€';
      const total = numericValue * quantity;
      // Format with currency in the same position as original
      return price.match(/^\d/) ? `${total} ${currency}` : `${currency} ${total}`;
    }
    return price; // Return original if parsing fails
  };

  const handleFormChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.institution.trim()) {
      toast.error('Institution or company is required');
      return false;
    }
    if (!formData.billingAddress.trim()) {
      toast.error('Billing address is required');
      return false;
    }
    if (!formData.shippingAddress.trim()) {
      toast.error('Shipping address is required');
      return false;
    }
    return true;
  };

  const handleGenerateQuote = () => {
    if (items.length === 0) return;
    setShowForm(true);
  };

  const handleBackToItems = () => {
    setShowForm(false);
  };

  const generateQuoteEmail = () => {
    if (!validateForm()) return;

    const subject = 'Quote Request - LaserBio Labs';
    
    let body = 'Dear LaserBio Labs,\n\n';
    body += 'I would like to request a quote for the following products:\n\n';
    
    body += '=== CONTACT INFORMATION ===\n';
    body += `Institution/Company: ${formData.institution}\n`;
    if (formData.department) body += `Department/Laboratory: ${formData.department}\n`;
    if (formData.vatNumber) body += `EU VAT Number: ${formData.vatNumber}\n`;
    if (formData.contactName) body += `Contact Name: ${formData.contactName}\n`;
    if (formData.contactEmail) body += `Contact Email: ${formData.contactEmail}\n`;
    if (formData.contactPhone) body += `Contact Phone: ${formData.contactPhone}\n`;
    body += '\n';
    
    body += '=== ADDRESSES ===\n';
    body += `Billing Address:\n${formData.billingAddress}\n\n`;
    body += `Shipping Address:\n${formData.shippingAddress}\n\n`;
    
    body += '=== PRODUCTS REQUESTED ===\n';
    items.forEach((item, index) => {
      body += `${index + 1}. ${item.name} (${item.id})\n`;
      body += `   Category: ${item.category}\n`;
      body += `   Price: ${item.price}\n`;
      body += `   Quantity: ${item.quantity}\n\n`;
    });
    
    body += '=== PLEASE PROVIDE ===\n';
    body += '- Total price including any applicable discounts\n';
    body += '- Availability and lead time\n';
    body += '- Shipping costs\n';
    body += '- Payment terms\n';
    body += '- Technical documentation\n\n';
    body += 'Thank you for your assistance.\n\n';
    body += 'Best regards,';

    // Open email client without navigating away from current page
    const mailtoLink = `mailto:info@laserbiolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const anchor = document.createElement('a');
    anchor.href = mailtoLink;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    // Reset form and close drawer
    setShowForm(false);
    setFormData({
      institution: '',
      department: '',
      billingAddress: '',
      shippingAddress: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    });
    toast.success('Quote request generated successfully');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            {showForm && (
              <Button variant="ghost" size="sm" onClick={handleBackToItems}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h2 className="text-xl">{showForm ? 'Quote Information' : 'Quote Request'}</h2>
              {!showForm && (
                <p className="text-sm text-gray-600">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        {showForm ? (
          // Quote Form
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Institution - Mandatory */}
              <div className="space-y-2">
                <Label htmlFor="institution">
                  Institution or Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="institution"
                  value={formData.institution}
                  onChange={(e) => handleFormChange('institution', e.target.value)}
                  placeholder="Enter your institution or company name"
                  required
                />
              </div>

              {/* Department - Optional */}
              <div className="space-y-2">
                <Label htmlFor="department">Department / Laboratory</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleFormChange('department', e.target.value)}
                  placeholder="Enter your department or laboratory"
                />
              </div>

              {/* EU VAT Number - Optional */}
              <div className="space-y-2">
                <Label htmlFor="vatNumber">EU VAT number (EU only)</Label>
                <Input
                  id="vatNumber"
                  value={formData.vatNumber}
                  onChange={(e) => handleFormChange('vatNumber', e.target.value)}
                  placeholder="Enter your EU VAT number"
                />
              </div>

              {/* Billing Address - Mandatory */}
              <div className="space-y-2">
                <Label htmlFor="billingAddress">
                  Billing Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) => handleFormChange('billingAddress', e.target.value)}
                  placeholder="Enter your billing address"
                  rows={3}
                  required
                />
              </div>

              {/* Shipping Address - Mandatory */}
              <div className="space-y-2">
                <Label htmlFor="shippingAddress">
                  Shipping Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={(e) => handleFormChange('shippingAddress', e.target.value)}
                  placeholder="Enter your shipping address"
                  rows={3}
                  required
                />
              </div>

              {/* Contact Name - Optional */}
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleFormChange('contactName', e.target.value)}
                  placeholder="Enter contact person's name"
                />
              </div>

              {/* Contact Email - Optional */}
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleFormChange('contactEmail', e.target.value)}
                  placeholder="Enter contact email address"
                />
              </div>

              {/* Contact Phone - Optional */}
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => handleFormChange('contactPhone', e.target.value)}
                  placeholder="Enter contact phone number"
                />
              </div>

              <div className="pt-2 text-xs text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </div>
            </div>
          </div>
        ) : (
          // Items List
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-gray-400 mb-4">
                  <Mail className="h-16 w-16 mx-auto mb-2" />
                  <p className="text-lg">Your quote is empty</p>
                  <p className="text-sm">Add products to request a quote</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <Badge variant="secondary" className="text-xs mb-2">
                            {item.id}
                          </Badge>
                          <h3 className="font-medium text-sm line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      <Separator className="my-2" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="font-medium text-primary">
                          {calculateItemTotal(item.price, item.quantity)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {showForm ? (
              <>
                <Button
                  className="w-full"
                  onClick={generateQuoteEmail}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Quote Request
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleBackToItems}
                >
                  Back to Items
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full"
                  onClick={handleGenerateQuote}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Generate Quote
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearQuote}
                >
                  Clear All
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
