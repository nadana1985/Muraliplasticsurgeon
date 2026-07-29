"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Navigation, CheckCircle } from "lucide-react";
import { clinicAddress, clinicPhone, clinicPhoneHref } from "@/data/content";

/* ─── Clinic Hours Data ─── */
const CLINIC_HOURS = [
  { day: "Monday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Tuesday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Wednesday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Thursday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Friday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Saturday", hours: "10:00 AM – 8:00 PM", isOpen: true },
  { day: "Sunday", hours: "By Appointment", isOpen: false },
];

/* ─── Google Maps Embed URL ─── */
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.2346!3d13.0418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264cb52a7e3e7%3A0xd288e30bcf18e5c1!2sHealwell%20Clinic%2C%20T%20Nagar!5e0!3m2!1sen!2sin!4v1700000000000";

/* ─── Working Hours Widget ─── */
function ClinicHoursWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current day to highlight
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayEntry = CLINIC_HOURS.find((h) => h.day === today);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900">Clinic Hours</h3>
            <p className="text-xs text-gray-400">Healwell Clinic, T Nagar</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
          aria-expanded={isExpanded}
          aria-label="Toggle clinic hours schedule"
        >
          {isExpanded ? "Collapse" : "Full Schedule"}
        </button>
      </div>

      {/* Today's hours (always visible) */}
      {todayEntry && (
        <div className="mt-4 rounded-xl bg-primary-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">Today ({todayEntry.day})</span>
            <span className="flex items-center gap-1.5 text-sm text-primary-600">
              {todayEntry.isOpen ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Open Now
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-gray-400" />
                  Closed
                </>
              )}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-gray-900">{todayEntry.hours}</p>
        </div>
      )}

      {/* Full schedule (expandable) */}
      <AnimatePresence>
      {isExpanded && (
        <motion.div
          key="clinic-hours"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-2"
        >
          {CLINIC_HOURS.map((entry) => {
            const isToday = entry.day === today;
            return (
              <div
                key={entry.day}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  isToday ? "bg-primary-50 border border-primary-100" : "hover:bg-gray-50"
                }`}
              >
                <span className={`font-medium ${isToday ? "text-primary-700" : "text-gray-700"}`}>
                  {entry.day}
                </span>
                <span className={`flex items-center gap-2 ${isToday ? "text-primary-600" : "text-gray-500"}`}>
                  {entry.hours}
                  {entry.isOpen ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  )}
                </span>
              </div>
            );
          })}
          <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
            <CheckCircle className="h-3 w-3" />
            Sunday consultations available by appointment only
          </p>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

/* ─── WhatsApp Quick Chat ─── */
function WhatsAppQuickChat() {
  const whatsappNumber = "918072582121";
  const defaultMessage = encodeURIComponent(
    "Hi Dr. Murali, I'd like to book an appointment."
  );

  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white shadow-md shadow-green-500/25">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-gray-900">WhatsApp Quick Chat</h3>
          <p className="text-xs text-gray-500">Get instant replies from the clinic</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Chat directly with our team for quick queries, appointment booking, or post-op guidance. 
        Available during clinic hours.
      </p>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-0.5"
      >
        <MessageCircle className="h-4 w-4" />
        Open WhatsApp
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

/* ─── Embedded Google Map ─── */
function EmbeddedMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
      <iframe
        src={GOOGLE_MAPS_EMBED_URL}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Healwell Clinic Location on Google Maps"
        className="w-full"
      />
      {/* Map overlay with directions CTA */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-primary-500" />
          <span>{clinicAddress.area}, {clinicAddress.city}</span>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicAddress.full)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          <Navigation className="h-3.5 w-3.5" />
          Get Directions
        </a>
      </div>
    </div>
  );
}

/* ─── Main Contact Section ─── */
export default function ContactSection() {
  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-custom mx-auto">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-500">
            Contact Us
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Ready to start your transformation? Reach out to us via phone, WhatsApp, or visit our clinic in person.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left: Map + Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Google Map */}
            <EmbeddedMap />

            {/* Clinic Hours Widget */}
            <ClinicHoursWidget />

            {/* WhatsApp Quick Chat */}
            <WhatsAppQuickChat />

            {/* Phone CTA */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Prefer to call?</p>
                  <a
                    href={clinicPhoneHref}
                    className="text-lg font-bold text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    {clinicPhone}
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Available Mon–Sat, 10 AM – 8 PM
              </p>
            </div>
          </div>

          {/* Right: Address Card + Clinic Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Address Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-gray-900">
                    Healwell Clinic
                  </h3>
                  <address className="mt-2 not-italic text-sm leading-relaxed text-gray-600">
                    {clinicAddress.line1}<br />
                    {clinicAddress.landmark}<br />
                    {clinicAddress.area}, {clinicAddress.city} – {clinicAddress.pincode}
                  </address>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicAddress.full)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    <Navigation className="h-4 w-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-primary-50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Phone className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">Call Us</p>
                <p className="mt-1 text-xs text-gray-500">For appointments & queries</p>
                <a
                  href={clinicPhoneHref}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  {clinicPhone}
                </a>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-green-50 p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">WhatsApp</p>
                <p className="mt-1 text-xs text-gray-500">Instant chat support</p>
                <a
                  href={`https://wa.me/918072582121?text=${encodeURIComponent("Hi Dr. Murali, I'd like to book an appointment.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Location Highlights */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-gray-900">How to Reach Us</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <span className="text-sm">🚇</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">By Metro</p>
                    <p className="mt-0.5 text-xs text-gray-500">Nandanam Metro (10 min walk)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <span className="text-sm">🚌</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">By Bus</p>
                    <p className="mt-0.5 text-xs text-gray-500">T Nagar Bus Stop (5 min walk)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <span className="text-sm">🅿️</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Parking</p>
                    <p className="mt-0.5 text-xs text-gray-500">Free parking available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
