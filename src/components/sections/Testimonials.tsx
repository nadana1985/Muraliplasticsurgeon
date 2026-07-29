const testimonials = [
  {
    quote:
      "I had my gynecomastia surgery with Dr. K. Murali sir in Chennai, and I am very happy with the overall experience. Dr. Murali was professional, friendly, and explained the entire procedure clearly, which made me feel comfortable.",
    author: "Mohammed Ali Saibudeen",
    rating: 5,
  },
  {
    quote:
      "Very impressive plastic surgeon. Professional, skilled, and delivered excellent results. Highly satisfied! Outstanding experience. The surgeon was knowledgeable, attentive.",
    author: "G Muthu Ishwarya",
    rating: 5,
  },
  {
    quote:
      "I had a great experience with Dr. Murali K. He is highly skilled, patient, and takes the time to explain procedures clearly, which made me feel comfortable and confident. The entire process—from consultation to treatment—was smooth.",
    author: "Magesh kumar P",
    rating: 5,
  },
  {
    quote:
      "Dr. Murali performed my liposuction and the results are absolutely amazing. He was very detailed in explaining the entire procedure and what to expect during recovery. The surgery was smooth and I felt very well taken care of throughout.",
    author: "Madhumitha R",
    rating: 5,
  },
  {
    quote:
      "Dr. Murali K seems to have a good reputation among many patients and students for being calm, skilled, and patient-friendly. People often mention that he explains procedures clearly and gives realistic expectations before surgery.",
    author: "Praveena Sundar",
    rating: 5,
  },
  {
    quote:
      "I had a very good experience with Dr. Murali Plastic Surgery Clinic. The doctor is highly professional, knowledgeable, and made me feel comfortable throughout the entire process. The staff were also very friendly and supportive.",
    author: "Aditi",
    rating: 5,
  },
  {
    quote:
      "I recently underwent a lipoma removal surgery and had a very smooth experience. The doctor was professional, attentive, and made me feel comfortable throughout the process. The procedure was quick, and the recovery has been going well.",
    author: "Aki",
    rating: 5,
  },
  {
    quote:
      "I'm truly grateful to Dr. Murali for his exceptional skill and compassionate care. The procedure went smoothly, and his clear guidance and support made my recovery much easier. He combines technical brilliance with genuine warmth.",
    author: "Sai Mahesh",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom mx-auto">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Patient Testimonials
          </h2>
          <p className="mt-3 text-gray-500">
            Real stories from our satisfied patients
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-4 text-gray-600 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}