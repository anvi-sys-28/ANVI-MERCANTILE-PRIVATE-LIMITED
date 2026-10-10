import { z } from 'zod';

export const quoteFormSchema = z.object({
  // Step 1: Shipment type & route
  serviceType: z.string().min(1, 'Please select a service type'),
  origin: z.string().min(2, 'Origin city / country is required'),
  destination: z.string().min(2, 'Destination city / country is required'),

  // Step 2: Cargo details
  cargoDescription: z.string().min(3, 'Please describe your cargo or product category'),
  weightKg: z.string().optional(),
  volumeCbm: z.string().optional(),
  incoterm: z.string().optional(),

  // Step 3: Contact details
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  company: z.string().optional(),
  notes: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const trackingFormSchema = z.object({
  trackingNumber: z.string().min(5, 'Tracking or container number must be at least 5 characters'),
});

export type TrackingFormData = z.infer<typeof trackingFormSchema>;
