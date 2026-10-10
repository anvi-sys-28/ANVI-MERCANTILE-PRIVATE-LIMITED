import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEO } from '@/components/global/SEO';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import { siteConfig } from '@/data/siteConfig';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    await new Promise((res) => setTimeout(res, 800));
    setSubmitted(true);
    reset();
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hello Anvi Mercantile! I have a trade inquiry.'
  )}`;

  return (
    <>
      <SEO
        title="Contact ANVI MERCANTILE PRIVATE LIMITED | Mumbai HQ & Global Offices"
        description="Get in touch with our trade specialists via phone, email, WhatsApp, or visit our Bandra Kurla Complex office in Mumbai."
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#071c35] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#0f5c66_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[#c9a46b] text-xs font-bold font-headline uppercase tracking-widest block">
            GLOBAL TRADE DESK & SUPPORT
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline uppercase tracking-tight text-white leading-none">
            CONTACT OUR TRADE TEAM
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl font-sans">
            Our trade logistics specialists are available 24/7 to answer custom queries, customs documentation requirements, and vessel bookings.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info & Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white p-8 rounded-2xl border border-[#0b3a40]/10 shadow-lg space-y-6">
                <h2 className="text-2xl font-bold font-headline uppercase text-[#0b3a40] pb-2 border-b border-[#0b3a40]/10">
                  HEADQUARTERS CONTACT DETAILS
                </h2>

                <div className="space-y-5 text-xs text-[#1a1f23]/80">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0b3a40] uppercase block text-xs font-headline">Corporate Office</span>
                      <span>{siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.zip}, {siteConfig.location.country}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0b3a40] uppercase block text-xs font-headline">Direct Phone</span>
                      <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#c9a46b] font-semibold text-sm">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0b3a40] uppercase block text-xs font-headline">Trade Desk Email</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#c9a46b] font-semibold text-sm">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#0b3a40] text-[#c9a46b] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[#0b3a40] uppercase block text-xs font-headline">Working Hours</span>
                      <span>{siteConfig.contact.workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0b3a40]/10 flex gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold font-headline uppercase py-3 rounded shadow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>

              {/* Map Embed Placeholder Box */}
              <div className="bg-white p-2 rounded-2xl border border-[#0b3a40]/10 shadow-lg overflow-hidden">
                <iframe
                  title="Anvi Mercantile Mumbai Office Map"
                  src={siteConfig.location.googleMapsEmbed}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
              </div>

            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#0b3a40]/10 shadow-lg space-y-6">
                
                <h2 className="text-2xl font-bold font-headline uppercase text-[#0b3a40]">
                  SEND AN OFFICIAL INQUIRY
                </h2>

                {submitted ? (
                  <div className="p-8 bg-[#f7f5f0] rounded-xl text-center space-y-4 border border-[#0b3a40]/10">
                    <CheckCircle2 className="w-12 h-12 text-[#c9a46b] mx-auto" />
                    <h3 className="text-xl font-bold font-headline uppercase text-[#0b3a40]">
                      MESSAGE SENT SUCCESSFULLY
                    </h3>
                    <p className="text-xs text-[#1a1f23]/80">
                      Thank you for contacting ANVI MERCANTILE PRIVATE LIMITED. Our representative will respond to your inquiry within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-[#0b3a40] text-white font-bold text-xs uppercase px-6 py-2.5 rounded"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          {...register('name')}
                          className="w-full bg-[#f7f5f0] text-xs sm:text-sm p-3.5 rounded-lg border border-[#0b3a40]/20 focus:outline-none focus:border-[#c9a46b]"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          {...register('email')}
                          className="w-full bg-[#f7f5f0] text-xs sm:text-sm p-3.5 rounded-lg border border-[#0b3a40]/20 focus:outline-none focus:border-[#c9a46b]"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register('phone')}
                          className="w-full bg-[#f7f5f0] text-xs sm:text-sm p-3.5 rounded-lg border border-[#0b3a40]/20 focus:outline-none focus:border-[#c9a46b]"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
                          Subject *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sea Freight Inquiry or Customs Brokerage"
                          {...register('subject')}
                          className="w-full bg-[#f7f5f0] text-xs sm:text-sm p-3.5 rounded-lg border border-[#0b3a40]/20 focus:outline-none focus:border-[#c9a46b]"
                        />
                        {errors.subject && (
                          <p className="text-[11px] text-red-600">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold font-headline uppercase text-[#0b3a40]">
                        Message / Query Details *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Provide details about your trade query, cargo specifications, target dates, or required documentation..."
                        {...register('message')}
                        className="w-full bg-[#f7f5f0] text-xs sm:text-sm p-3.5 rounded-lg border border-[#0b3a40]/20 focus:outline-none focus:border-[#c9a46b]"
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a46b] hover:bg-[#b59057] text-[#0b3a40] font-bold text-xs uppercase tracking-wider py-4 rounded-lg shadow-lg transition-all"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Submit Official Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
