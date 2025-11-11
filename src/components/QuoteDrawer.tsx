import { X, Mail, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useQuote } from './QuoteContext';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteDrawer({ isOpen, onClose }: QuoteDrawerProps) {
  const { items, removeItem, updateQuantity, clearQuote, totalItems } = useQuote();

  const generateQuoteEmail = () => {
    if (items.length === 0) return;

    const subject = 'Quote Request - LaserBio Labs';
    
    let body = 'Dear LaserBio Labs,\n\n';
    body += 'I would like to request a quote for the following products:\n\n';
    
    items.forEach((item, index) => {
      body += `${index + 1}. ${item.name} (${item.id})\n`;
      body += `   Category: ${item.category}\n`;
      body += `   Price: ${item.price}\n`;
      body += `   Quantity: ${item.quantity}\n\n`;
    });
    
    body += 'Please provide:\n';
    body += '- Total price including any applicable discounts\n';
    body += '- Availability and lead time\n';
    body += '- Shipping costs to [Your Location]\n';
    body += '- Payment terms\n';
    body += '- Technical documentation\n\n';
    body += 'Thank you for your assistance.\n\n';
    body += 'Best regards,';

    window.location.href = `mailto:orders@laserbiolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          <div>
            <h2 className="text-xl">Quote Request</h2>
            <p className="text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items List */}
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
                      <div className="font-medium text-primary">{item.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <Button
              className="w-full"
              onClick={generateQuoteEmail}
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
          </div>
        )}
      </div>
    </>
  );
}
