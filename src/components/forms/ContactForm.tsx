"use client";

import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { Check, Info, Loader2, Phone, Calendar } from "lucide-react";

/* ─── Zod Schema ─── */
const bookingSchema = z.object({
  procedure: z.string().min(1, "Please select a procedure"),
  triageDuration: z.string().optional(),
  triageDisk: z.string().optional(),
  triageWeight: z.string().optional(),
  preferredDate: z.date().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const PROCEDURES = [
  { id: "gynecomastia", label: "Gynecomastia", icon: "♂" },
  { id: "liposuction", label: "Liposuction", icon: "💪" },
  { id: "rhinoplasty", label: "Rhinoplasty", icon: "👃" },
  { id: "breast-augmentation", label: "Breast Augmentation", icon: "✨" },
  { id: "hair-transplant", label: "Hair Transplant", icon: "💇" },
  { id: "face-lift", label: "Face Lift", icon: "🌟" },
  { id: "circumcision", label: "Circumcision", icon: "🏥" },
  { id: "other", label: "Other / Not Sure", icon: "💬" },
];

const GYNECOMASTIA_TRIAGE = [
  { id: "duration", question: "How long have you noticed the swelling?", options: ["Less than 6 months", "6–12 months", "More than 1 year"] },
  { id: "disk", question: "Do you feel a firm disk behind the nipple?", options: ["Yes, firm disk present", "No, mostly soft tissue", "Not sure"] },
  { id: "weight", question: "Have you noticed weight gain or BMI changes?", options: ["Yes, gained weight recently", "No, stable weight", "Not sure"] },
];

const LIPOSUCTION_TRIAGE = [
  { id: "duration", question: "Which area has localized fat pockets?", options: ["Abdomen", "Thighs", "Arms", "Chest", "Multiple areas"] },
  { id: "disk", question: "Have you tried diet and exercise?", options: ["Yes, no improvement", "Partially helpful", "Haven't tried yet"] },
  { id: "weight", question: "Is your weight currently stable?", options: ["Yes, stable for 3+ months", "Still fluctuating", "Actively losing weight"] },
];

/* ─── Progress Bar ─── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${
              i + 1 <= step
                ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {i + 1 < step ? (
              <Check className="h-4 w-4" />
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 transition-all duration-300 sm:w-12 ${i + 1 < step ? "bg-primary-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Step 1: Procedure Selection ─── */
function StepProcedure({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-gray-900">What concerns you?</h3>
      <p className="mt-1 text-sm text-gray-500">Select the procedure you&apos;re interested in</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PROCEDURES.map((proc) => (
          <button
            key={proc.id}
            type="button"
            onClick={() => onChange(proc.id)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all duration-200 ${
              value === proc.id
                ? "border-primary-500 bg-primary-50 text-primary-700 shadow-md shadow-primary-500/10"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">{proc.icon}</span>
            <span className="text-xs font-medium leading-tight">{proc.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 1b: Dynamic Triage ─── */
function StepTriage({ procedure, triage, onTriageChange }: { procedure: string; triage: Record<string, string>; onTriageChange: (id: string, value: string) => void }) {
  const questions = procedure === "gynecomastia" ? GYNECOMASTIA_TRIAGE : procedure === "liposuction" ? LIPOSUCTION_TRIAGE : null;

  if (!questions) return null;

  return (
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-amber-600" />
        <h4 className="text-sm font-semibold text-amber-800">Quick Screening Questions</h4>
      </div>
      <p className="mt-1 text-xs text-amber-700">These help Dr. Murali prepare for your consultation</p>

      <div className="mt-4 space-y-4">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="text-sm font-medium text-gray-700">{q.question}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onTriageChange(q.id, opt)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    triage[q.id] === opt
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Date Picker ─── */
function StepDate({ value, onChange }: { value: Date | undefined; onChange: (d: Date | undefined) => void }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-gray-900">Preferred date?</h3>
      <p className="mt-1 text-sm text-gray-500">Choose your preferred appointment date</p>
      <div className="mt-4 flex justify-center">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={{ before: new Date() }}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          classNames={{
            selected: "bg-primary-500 text-white hover:bg-primary-600",
            today: "font-bold text-primary-600",
            day_button: "rounded-lg hover:bg-primary-50",
          }}
        />
      </div>
      {value && (
        <p className="mt-3 text-center text-sm text-gray-600">
          Selected: <span className="font-semibold text-primary-600">{format(value, "EEEE, MMMM d, yyyy")}</span>
        </p>
      )}
      <p className="mt-3 text-center text-xs text-gray-400">You can also call to schedule: +91 80725 82121</p>
    </div>
  );
}

/* ─── Step 3: Patient Details ─── */
function StepDetails({ register, errors }: { register: UseFormRegister<BookingFormData>; errors: any }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-gray-900">Your details</h3>
      <p className="mt-1 text-sm text-gray-500">We&apos;ll use these to confirm your appointment</p>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            id="booking-name"
            placeholder="Your full name"
            className={`mt-1 block w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-primary-500 focus:ring-primary-500/20"
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">+91</span>
            <input
              {...register("phone")}
              id="booking-phone"
              type="tel"
              placeholder="80725 82121"
              className={`mt-1 block w-full rounded-xl border py-3 pl-12 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-primary-500 focus:ring-primary-500/20"
              }`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-xs text-gray-400">(optional)</span>
          </label>
          <input
            {...register("email")}
            id="booking-email"
            type="email"
            placeholder="your@email.com"
            className="mt-1 block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Confirm & Book ─── */
function StepConfirm({ data }: { data: BookingFormData }) {
  const procedureLabel = PROCEDURES.find((p) => p.id === data.procedure)?.label || data.procedure;

  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-gray-900">Confirm &amp; Book</h3>
      <p className="mt-1 text-sm text-gray-500">Review your details before booking</p>

      <div className="mt-4 space-y-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Procedure</span>
          <span className="font-medium text-gray-900">{procedureLabel}</span>
        </div>
        {data.preferredDate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">{format(data.preferredDate, "MMM d, yyyy")}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Name</span>
          <span className="font-medium text-gray-900">{data.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Phone</span>
          <span className="font-medium text-gray-900">+91 {data.phone}</span>
        </div>
        {data.email && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-900">{data.email}</span>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
        <p>Your details will be sent to Dr. Murali&apos;s clinic. You&apos;ll also be redirected to WhatsApp for instant confirmation.</p>
      </div>
    </div>
  );
}

/* ─── Main Form ─── */
export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [triage, setTriage] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { procedure: "", name: "", phone: "", email: "" },
  });

  const watchedProcedure = watch("procedure");

  const handleProcedureSelect = (id: string) => {
    setValue("procedure", id, { shouldValidate: true });
  };

  const handleTriageChange = (id: string, value: string) => {
    setTriage((prev) => ({ ...prev, [id]: value }));
  };

  const onSubmit = async (data: BookingFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, preferredDate: selectedDate, triage }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");

      // WhatsApp redirect
      const triageText = Object.entries(triage).map(([k, v]) => `${k}: ${v}`).join(", ");
      const waMessage = encodeURIComponent(
        `Hi Dr. Murali, I'd like to book an appointment.\n\nProcedure: ${PROCEDURES.find((p) => p.id === data.procedure)?.label || data.procedure}\n${triageText ? `Triage: ${triageText}\n` : ""}${data.preferredDate ? `Preferred Date: ${format(data.preferredDate, "MMM d, yyyy")}\n` : ""}Name: ${data.name}\nPhone: +91 ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}`
      );
      window.open(`https://wa.me/918072582121?text=${waMessage}`, "_blank");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-green-800">Booking Request Sent!</h3>
        <p className="mt-2 text-sm text-green-600">We&apos;ve also opened WhatsApp for instant confirmation.</p>
        <div className="mt-4 flex justify-center gap-3">
          <a href="tel:+918072582121" className="flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <button onClick={() => { setStatus("idle"); setStep(1); setTriage({}); setSelectedDate(undefined); }} className="flex items-center gap-1.5 rounded-xl border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors">
            <Calendar className="h-4 w-4" />
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProgressBar step={step} total={4} />

      {step === 1 && (
        <>
          <StepProcedure value={watchedProcedure} onChange={handleProcedureSelect} />
          {(watchedProcedure === "gynecomastia" || watchedProcedure === "liposuction") && (
            <StepTriage procedure={watchedProcedure} triage={triage} onTriageChange={handleTriageChange} />
          )}
        </>
      )}
      {step === 2 && <StepDate value={selectedDate} onChange={setSelectedDate} />}
      {step === 3 && <StepDetails register={register} errors={errors} />}
      {step === 4 && <StepConfirm data={{ ...watch(), preferredDate: selectedDate }} />}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Something went wrong. Please try again or call us at +91 80725 82121.
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1 && !watchedProcedure) return;
              setStep((s) => s + 1);
            }}
            disabled={step === 1 && !watchedProcedure}
            className="flex-1 rounded-xl bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-1 rounded-xl bg-primary-500 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "📞 Book Appointment & Open WhatsApp"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
