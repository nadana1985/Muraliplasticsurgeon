const valueProps = [
  {
    icon: "🏥",
    title: "Advanced Technology",
    description:
      "State-of-the-art equipment and cutting-edge techniques for optimal results and safety.",
  },
  {
    icon: "👨‍⚕️",
    title: "Expert Surgeon",
    description:
      "8+ years of specialized experience in aesthetic and plastic surgery with a commitment to excellence.",
  },
  {
    icon: "🌟",
    title: "Natural Results",
    description:
      "Focus on enhancing your natural beauty with subtle, sophisticated outcomes that look and feel authentic.",
  },
  {
    icon: "🤝",
    title: "Personalized Care",
    description:
      "Tailored treatment plans designed around your unique goals, ensuring compassionate care at every step.",
  },
  {
    icon: "🔒",
    title: "Safe & Confidential",
    description:
      "Strict privacy protocols and highest safety standards in a comfortable, discreet environment.",
  },
  {
    icon: "💫",
    title: "Holistic Approach",
    description:
      "Comprehensive care from consultation to recovery, supporting your complete transformation journey.",
  },
];

export default function ValueProps() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Dr. Murali K
          </h2>
          <p className="mt-3 text-gray-500">
            Experience the difference of expert care and personalized attention
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl">
                {prop.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-gray-900">
                {prop.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}