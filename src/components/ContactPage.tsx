import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailBody = `Name: ${formData.name}
Organization: ${formData.organization}
Phone: ${formData.phone}
Email: ${formData.email}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}`;

    const subject =
      formData.subject ||
      `${formData.inquiryType} Inquiry from ${formData.name}`;

    window.location.href = `mailto:info@laserbiolabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "LaserBio Labs",
        "AREP Center",
        "1 Traverse des Brucs",
        "06560 Valbonne, France",
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+33 (0)9 84 23 77 19"],
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "General: info@laserbiolabs.com",
        "Sales: sales@laserbiolabs.com",
      ],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 - 17:00 CET",
        "Saturday - Sunday: Closed",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team for product inquiries,
            technical support, or general questions
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Information */}
          <div className="space-y-6 max-w-2xl w-full">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  We're here to help with your MALDI-TOF
                  calibration needs. Whether you need technical
                  support, product information, or custom
                  solutions, our team of experts is ready to
                  assist you.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        {item.details.map(
                          (detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-gray-600 text-sm"
                            >
                              {detail}
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      const subject = "Product Inquiry";
                      const body = `Dear LaserBio Labs Team,

I am interested in learning more about your MALDI-TOF calibration products.

Product/Category of Interest:

Specific Questions:

Organization:
Name:
Contact Number:

Best regards,`;
                      window.location.href = `mailto:info@laserbiolabs.com?cc=sales@laserbiolabs.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Product Inquiry
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      const subject = "Technical Support Request";
                      const body = `Dear LaserBio Labs Team,

I need technical assistance with the following:

Product Name/Code:

Issue Description:

Instrument Model:
Current Application:

Organization:
Name:
Contact Number:

Best regards,`;
                      window.location.href = `mailto:info@laserbiolabs.com?cc=sales@laserbiolabs.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Technical Support
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      const subject = "Order Status Inquiry";
                      const body = `Dear LaserBio Labs Team,

I would like to inquire about the status of my order.

Order Reference/Date:

Products Ordered:

Additional Information:

Organization:
Name:
Contact Number:

Best regards,`;
                      window.location.href = `mailto:info@laserbiolabs.com?cc=sales@laserbiolabs.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Order Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CONTACT FORM - COMMENTED OUT
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange(
                          "name",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="organization">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) =>
                        handleInputChange(
                          "organization",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phone",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">
                    Inquiry Type
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("inquiryType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product Information">
                        Product Information
                      </SelectItem>
                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                      <SelectItem value="Custom Order">
                        Custom Order Request
                      </SelectItem>
                      <SelectItem value="Pricing">
                        Pricing & Quotation
                      </SelectItem>
                      <SelectItem value="Partnership">
                        Partnership Inquiry
                      </SelectItem>
                      <SelectItem value="Other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange(
                        "subject",
                        e.target.value,
                      )
                    }
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange(
                        "message",
                        e.target.value,
                      )
                    }
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                * Required fields. We typically respond to
                inquiries within 24 hours during business days.
              </p>
            </CardContent>
          </Card>
          */}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg mb-4 text-gray-900">
            Response Times
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Sales Inquiries
              </h4>
              <p className="text-gray-600">
                Response within 4-6 hours during business days
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Technical Support
              </h4>
              <p className="text-gray-600">
                Response within 24 hours, urgent issues
                prioritized
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                General Inquiries
              </h4>
              <p className="text-gray-600">
                Response within 24-48 hours during business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}