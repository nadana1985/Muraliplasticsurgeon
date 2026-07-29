import { BlogPost } from "@/types";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  name: string;
  category: string;
}

export interface ContactForm {
  description: string;
  fields: { name: string; type: string; required: boolean }[];
}

export interface SiteBranding {
  siteTitle: string;
  logoUrl: string;
  logoAlt: string;
  primaryColor: string;
  tagline: string;
}

export interface ClinicAddress {
  line1: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  full: string;
}

export const navigationLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Healwell Clinic", href: "/healwell" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const siteBranding: SiteBranding = {
  siteTitle: "Dr. Murali. K",
  logoUrl: "/images/logo-256.png",
  logoAlt: "Murali Logo",
  primaryColor: "#3e71b2",
  tagline: "Sculpting dreams, crafting beauty & restoring form…",
};

export const clinicPhone = "+91-8072582121";
export const clinicPhoneFormatted = "+91 80725 82121";
export const clinicPhoneHref = "tel:+918072582121";

export const clinicAddress: ClinicAddress = {
  line1: "No.2, Bharathi Nagar 1st Street",
  landmark: "Near North Usman Road",
  area: "T Nagar",
  city: "Chennai",
  pincode: "600017",
  full: "No.2, Bharathi Nagar 1st Street, Near North Usman Road, T Nagar, Chennai – 600017",
};

export const featuredServiceLinks: ServiceLink[] = [
  { label: "Rhinoplasty", href: "/services#rhinoplasty" },
  { label: "Liposuction", href: "/services#liposuction" },
  { label: "Breast Augmentation", href: "/services#breast-augmentation" },
  { label: "Gynaecomastia", href: "/services#gynaecomastia" },
  { label: "Hair Transplant", href: "/services#hair-transplant" },
  { label: "Face Lift", href: "/services#face-lift" },
];

export const allServices: ServiceItem[] = [
  { name: "Blepharoplasty", category: "Face" },
  { name: "Fillers", category: "Face" },
  { name: "Gynaecomastia", category: "Male" },
  { name: "Rhinoplasty", category: "Face" },
  { name: "Hair Transplant", category: "Hair" },
  { name: "Liposuction", category: "Body" },
  { name: "Breast Reduction", category: "Breast" },
  { name: "Breast Lift", category: "Breast" },
  { name: "Breast Augmentation", category: "Breast" },
  { name: "Fat Transfer", category: "Body" },
  { name: "Scar Revision", category: "Skin" },
  { name: "Thread Lift", category: "Face" },
  { name: "Face Lift", category: "Face" },
  { name: "Otoplasty", category: "Face" },
  { name: "Body Sculpting", category: "Body" },
  { name: "PRP", category: "Hair" },
  { name: "Abdominoplasty", category: "Body" },
  { name: "Labiaplasty", category: "Intimate" },
];

export const quickLinks: NavLink[] = [
  { label: "About Dr. Murali", href: "/about" },
  { label: "Healwell Clinic", href: "/healwell" },
  { label: "Blog", href: "/blog" },
  { label: "Book Appointment", href: "/contact" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "breast-augmentation-with-silicone-implants",
    title: "Breast Augmentation with Silicone Implants: Expert Guide by Dr. Murali K",
    description: "Breast augmentation is one of the most popular cosmetic procedures worldwide, helping women achieve fuller, more proportionate breasts with long-lasting confidence.",
    category: "Breast",
    date: "October 24, 2025",
    content: `Breast augmentation is one of the most popular cosmetic procedures worldwide, helping women achieve fuller, more proportionate breasts with long-lasting confidence. Among the various implant options available today, silicone breast implants are often preferred due to their natural feel, durability, and aesthetic results.

In this blog, Dr. Murali K, a renowned plastic surgeon from Chennai, India, specializing in breast surgeries, explains the benefits of silicone implants and why they remain a preferred choice for women considering breast augmentation.

## What Are Silicone Breast Implants?

Silicone breast implants are filled with a cohesive silicone gel that mimics the natural feel and softness of breast tissue. This gel is designed to maintain shape, making silicone implants ideal for women looking for realistic results.

## Top Advantages of Silicone Breast Implants

### 1. Natural Look and Feel
Silicone implants closely resemble natural breast tissue in softness and movement. This makes them a popular choice for women who want results that look and feel as natural as possible.

### 2. Shape Retention
Silicone gel maintains its shape more effectively than saline, ensuring a consistent and aesthetically pleasing contour even over time.

### 3. Lower Risk of Rippling
Rippling is more commonly associated with saline implants, especially in women with thinner breast tissue. Silicone implants significantly reduce this risk.

### 4. Ideal for Thin Individuals
Women with minimal natural breast tissue benefit greatly from silicone implants, as they provide smoother results under the skin.

### 5. Cohesive "Gummy Bear" Options
Modern silicone implants are available in a cohesive gel form (commonly called "gummy bear" implants), which retain their shape even if the outer shell is compromised.

### 6. Long-Lasting Results
With proper care and monitoring, silicone implants can maintain their shape and integrity for many years, offering better longevity compared to other types.

## Who Is the Best Candidate for Silicone Breast Implants?

Candidates for silicone implants typically:
- Desire a natural-looking augmentation
- Want fuller, feminine curves
- Have small or asymmetrical breasts
- Prefer minimal implant visibility or rippling
- Have realistic expectations

A detailed consultation helps determine the most suitable implant type, size, and placement based on your body proportions and cosmetic goals.

## The Breast Implant Procedure

Under the expert care of Dr. Murali K, the breast augmentation process involves:
1. Personalized Consultation
2. Choosing the Right Implant Type, Size & Shape
3. Precision Surgical Planning
4. Minimally Invasive Implant Placement
5. Safe, Smooth Recovery with Follow-Up Care

His patient-centric approach ensures natural results with minimal scarring and optimal breast symmetry.

## Post-Operative Care and Longevity

Silicone breast implants are durable and long-lasting. With regular clinical check-ups and self-awareness, most patients enjoy results for years with high satisfaction.

## Why Choose Silicone Breast Implants with Dr. Murali K?

- Expert in aesthetic breast surgeries
- Precision-driven approach for symmetry & proportion
- Uses advanced, FDA-approved silicone implants
- Tailored results based on individual anatomy & goals
- High patient satisfaction and safety standards

## Final Thoughts

If you're looking for enhanced breast volume, natural feel, and long-lasting aesthetic results, silicone breast implants are one of the best choices available today. Under the skilled hands of Dr. Murali K, you can achieve the shape and confidence you've always desired.

## Book Your Consultation Today

Want to know if silicone breast implants are right for you? Schedule a consultation with Dr. Murali K and begin your journey to a more confident you.`,
  },
  {
    slug: "gynecomastia-treatment-in-chennai",
    title: "Gynecomastia Treatment in Chennai: Liposuction for Men",
    description: "Get permanent relief from male breast enlargement with advanced liposuction. Safe, scar-minimal gynecomastia treatment in Chennai by Dr. Murali K.",
    category: "Male",
    date: "October 22, 2025",
    content: `## Understanding Gynecomastia

Gynecomastia, or male breast enlargement, is a common condition that affects men of all ages. It occurs due to an imbalance between estrogen and testosterone, leading to the development of excess breast tissue.

Men with gynecomastia often feel self-conscious about their chest appearance, especially when wearing fitted shirts or going shirtless.

If you're looking for a permanent solution for gynecomastia in Chennai, modern surgical techniques like liposuction offer excellent results with minimal downtime.

## Common Causes of Gynecomastia

Gynecomastia can develop due to several reasons:
- Hormonal changes during puberty or aging
- Certain medications or steroid use
- Weight gain and obesity
- Alcohol or substance use
- Genetic or idiopathic causes

Understanding the root cause is important before planning treatment. A qualified plastic surgeon in Chennai can help assess your condition and suggest the most suitable treatment option.

## Treatment Options for Gynecomastia

Depending on the stage and severity, there are several ways to manage gynecomastia:

### 1. Observation and Lifestyle Modification
In mild cases, reducing weight, avoiding steroids or alcohol, and maintaining a balanced diet may help. However, true glandular gynecomastia usually doesn't resolve completely with exercise alone.

### 2. Medication
If hormonal imbalance is the primary cause, certain medications can be prescribed to restore balance. But these are effective only in early stages and cannot remove existing glandular tissue.

### 3. Surgical Treatment
For lasting and visible results, surgery remains the most effective gynecomastia treatment. The two main surgical approaches are:
- **Liposuction** – removes excess fat from the chest area.
- **Excision** – removes firm glandular tissue or excess skin.

Often, a combination of liposuction and gland excision provides the best contour and definition.

## Why Liposuction Is the Gold Standard for Male Chest Reduction

Liposuction is the preferred technique for most patients undergoing gynecomastia surgery in Chennai. Here's why:

### 1. Minimally Invasive Procedure
Tiny, hidden incisions are made near the chest crease or armpit, resulting in minimal scarring and faster recovery.

### 2. Natural, Sculpted Chest Contour
Advanced liposuction for gynecomastia allows your surgeon to precisely shape the chest, restoring a firm and masculine appearance.

### 3. Short Recovery Time
Most patients resume normal work within 2–3 days and can return to gym workouts within 2–3 weeks.

### 4. Permanent Results
Once fat cells are removed, they do not return. Maintaining a healthy lifestyle helps sustain the results long-term.

### 5. Confidence and Improved Body Image
The transformation after gynecomastia correction is both physical and emotional — patients report improved self-esteem and confidence.

## Advanced Gynecomastia Liposuction at Healwell Clinic

Our team in Chennai uses the latest power-assisted and micro-cannula liposuction technology to ensure precision, safety, and smooth results.

Our plastic and aesthetic surgeon, Dr. Murali K, specializes in gynecomastia surgery with a focus on natural chest contouring, minimal scars, and quick recovery. Each treatment is customized to your anatomy and aesthetic goals.

## Cost of Gynecomastia Surgery in Chennai

The gynecomastia surgery cost in Chennai varies depending on the grade of enlargement, technique used, and individual needs. A consultation will help determine the exact cost and best approach for your condition.

## Book a Consultation

If you're struggling with male breast enlargement and want a safe, effective, and lasting solution, liposuction for gynecomastia is your best choice.

Book your consultation with Dr. Murali K, Chennai today and take the first step toward a confident, sculpted chest.`,
  },
  {
    slug: "stapler-circumcision-myths-vs-facts",
    title: "Stapler Circumcision: Myths vs Facts",
    description: "Circumcision is one of the most commonly performed surgical procedures worldwide. With medical advances, newer techniques such as stapler circumcision have made the procedure quicker, safer, and virtually painless.",
    category: "Circumcision",
    date: "August 17, 2025",
    content: `Circumcision is one of the most commonly performed surgical procedures worldwide. With medical advances, newer techniques such as stapler circumcision have made the procedure quicker, safer, and virtually painless. Yet, many myths and misconceptions often stop people from making an informed decision.

At Healwell Clinic, Chennai, we believe in educating our patients. Let's clear the air by looking at the most common myths vs truths about stapler circumcision.

## Myth 1: Stapler circumcision is painful

**Truth:** The procedure is performed under local anesthesia. Patients do not feel pain during the surgery, and most report only mild discomfort for a day or two afterward. Pain relief medications are prescribed, ensuring a smooth and comfortable recovery.

## Myth 2: Staples leave big scars

**Truth:** This is one of the biggest misconceptions. The stapler device is specially designed for clean, precise cuts and immediate sealing of blood vessels. Once healed, the scar is minimal and hardly visible. In fact, cosmetic results are superior compared to traditional circumcision methods.

## Myth 3: Recovery takes weeks

**Truth:** With stapler circumcision, most patients are back to their daily routine within 2–3 days. Complete healing usually takes 7–10 days, much faster than conventional methods. Since there are no stitches to remove, recovery is simple and stress-free.

## Myth 4: It requires hospital admission

**Truth:** Stapler circumcision is a 15-minute outpatient procedure. You walk in, get the surgery done under local anesthesia, and walk out the same day. No hospital stay is needed.

## Myth 5: It causes heavy bleeding

**Truth:** One of the key advantages of stapler circumcision is that it is virtually bloodless. The stapler seals the blood vessels as it cuts, significantly reducing bleeding risk.

## Why Choose Stapler Circumcision at Healwell Clinic?

- ✔ Performed by an experienced Plastic & Aesthetic Surgeon
- ✔ Safe, quick, and minimally invasive
- ✔ Stitch-free and bloodless
- ✔ Excellent cosmetic outcome
- ✔ Affordable packages with free online consultation

Stapler circumcision is a modern, safe, and reliable technique that eliminates many of the problems associated with traditional surgery. If you or your loved one is considering circumcision, don't let myths hold you back.

📞 Book your appointment at Healwell Clinic, Chennai with Dr. Murali K today.
Call/WhatsApp: +91-8072582121`,
  },
  {
    slug: "circumcision-safe-simple-procedure",
    title: "Circumcision: A Safe & Simple Procedure — Now Easier Than Ever with Stapler Circumcision",
    description: "Circumcision is a common surgical procedure that involves the removal of the foreskin covering the tip of the penis. Modern techniques have made it safer and more comfortable.",
    category: "Circumcision",
    date: "August 3, 2025",
    content: `Circumcision is a common surgical procedure that involves the removal of the foreskin covering the tip of the penis. It is performed for various reasons including religious, cultural, medical, or personal preference.

Today, modern techniques have made circumcision safer, quicker, and more comfortable than ever before. One such innovation is stapler circumcision, which is rapidly becoming the preferred method for many patients and surgeons alike.

## Why Consider Circumcision?

Some of the common benefits of circumcision include:
- Improved hygiene and easier cleaning
- Reduced risk of certain infections
- Medical treatment for conditions like phimosis (tight foreskin)
- Possible reduction in the risk of some sexually transmitted infections

## What Makes Stapler Circumcision Better?

Traditional circumcision methods involve using a scalpel or surgical scissors, sutures, and longer recovery times. Stapler circumcision, on the other hand, uses a special disposable device that cuts and seals the wound at the same time.

Key benefits of stapler circumcision include:
- Shorter procedure time, usually 10–15 minutes
- Minimal pain and blood loss
- Neater wound edges with faster healing
- No stitches — the stapler's silicone ring falls off on its own after a few days
- Lower risk of infection and complications

## No Hospital Admission Needed: Walk In, Walk Out!

One of the biggest advantages of stapler circumcision is that it does not require hospital admission. It is performed safely as a day care outpatient procedure under local anesthesia. Patients can go home the same day and resume routine activities within a couple of days, with minimal downtime.

## Get It Done by an Expert — Special Offer in Chennai

At our clinic in Chennai, stapler circumcision is performed by our experienced Plastic Surgeon, Dr. Murali K, ensuring the highest standards of safety and care.

For now we are offering circumcision at a Special Offer Price at ₹20,000/- (all inclusive)

To book your appointment or learn more, contact us today! Call us at 8072582121.

Take the step towards better health and hygiene — safely, quickly, and with complete privacy.`,
  },
  {
    slug: "recovering-from-gynecomastia-surgery",
    title: "Recovering from Gynecomastia Surgery: The Do's & Don'ts",
    description: "Gynecomastia surgery can be a life-changing procedure for men struggling with enlarged breast tissue. Proper recovery is crucial for optimal results.",
    category: "Male",
    date: "February 16, 2025",
    content: `Gynecomastia surgery can be a life-changing procedure for men struggling with enlarged breast tissue. Proper recovery is crucial for optimal results and a smooth healing process. This post outlines key do's and don'ts to help you navigate your recovery journey.

## The Do's: Your Path to a Smooth Recovery

Following your surgeon's instructions is paramount. They are your best resource for a successful outcome. Here's a breakdown of essential practices:

**Compression is Key:** Wear your compression garment consistently as directed to minimize swelling and support contouring.

**Rest and Recharge:** Get plenty of rest and sleep, especially during the first week, to facilitate active body healing.

**Manage Pain Effectively:** Take prescribed pain relievers on schedule to maintain comfort and support restful healing.

**Cleanliness is Next to Godliness:** Keep the surgical area clean and dry, following specific instructions for bathing and dressing changes.

**Nourish Your Body:** Eat a nutrient-rich diet with plenty of fruits, vegetables, and lean proteins to fuel recovery.

**Hydration is Essential:** Drink ample water and clear fluids throughout the day to support circulation and healing.

**Follow-Up is Crucial:** Attend all scheduled postoperative checks with Dr. Murali to monitor your progress.

## The Don'ts: Avoiding Complications

Just as important as the do's are the don'ts. These are actions to avoid to prevent complications and ensure a smooth recovery:

**No Strenuous Activity:** Refrain from heavy lifting, workouts, or running for several weeks post-surgery.

**Say No to Smoking and Alcohol:** Avoid smoking and drinking alcohol as they reduce oxygen levels and delay tissue recovery.

**Medication Caution:** Do not take aspirin, blood thinners, or other unapproved medications without consulting Dr. Murali.

**Sun Protection:** Avoid exposing the healing chest skin to direct sunlight to prevent pigmentation changes.

**Don't Ignore Warning Signs:** Do not ignore warning signs like sudden swelling, extreme pain, or pus; report them immediately.

**Sleep Position:** Avoid sleeping on your stomach or side; sleep flat on your back to prevent chest pressure.

Recovering from gynecomastia surgery takes time and patience. By following these do's and don'ts, and most importantly, adhering to your surgeon's personalized instructions, you can optimize your healing process and achieve the best possible results.`,
  },
  {
    slug: "lipoma-post-surgical-care",
    title: "Lipoma – Post Surgical Care",
    description: "Guidelines for post-surgical care after lipoma removal surgery. Follow these do's and don'ts for a smooth recovery.",
    category: "Skin",
    date: "July 5, 2024",
    content: `## The Do's:

**Follow Your Surgeon's Instructions:** Adhere strictly to the post-operative care guidelines provided by Dr. Murali.

**Keep the Incision Area Clean:** Gently wash the site with mild soap and water as directed, avoiding harsh scrubbing.

**Monitor for Signs of Infection:** Watch for signs of infection like increased redness, swelling, warmth, or pus.

**Manage Pain and Discomfort:** Take prescribed pain relievers as directed to stay comfortable during early recovery.

**Rest and Allow Your Body to Heal:** Rest adequately and avoid straining the incision during the initial healing phase.

**Eat a Healthy Diet:** Eat a balanced diet rich in vitamins and nutrients to support tissue rebuilding.

**Attend Follow-Up Appointments:** Keep all scheduled follow-up visits to monitor your healing progress.

## The Don'ts:

**Do Not Pick at or Touch the Incision:** Do not pick, scratch, or touch the incision, stitches, or scabs unnecessarily.

**Avoid Submerging the Incision in Water:** Avoid swimming, baths, or hot tubs until your incision is fully healed.

**Do Not Smoke:** Avoid smoking as it reduces blood circulation and impairs wound healing.

**Avoid Alcohol:** Do not drink alcohol, as it can interact negatively with pain medications.

**Skip Strenuous Activities:** Avoid workouts, heavy lifting, or straining the incision area.

**Don't Skip Medications:** Complete your full course of prescribed antibiotics or pain relievers.

**Do Not Rush Your Recovery:** Avoid returning to heavy activities early; let your body heal at its own pace.

By following these guidelines, you can promote a smooth recovery process and reduce the risk of complications after lipoma removal surgery. Remember, your surgeon is your best resource for personalized advice and support throughout your recovery journey.`,
  },
];

export const clinicImages = [
  { alt: "Reception", src: "/images/clinic/reception.jpg", width: 1024, height: 768 },
  { alt: "Consulting Room", src: "/images/clinic/consulting-room.jpg", width: 1024, height: 768 },
  { alt: "Outdoor", src: "/images/clinic/outdoor.jpg", width: 1024, height: 768 },
];

export const serviceCategories = [
  { name: "Face", icon: "✨", services: ["Rhinoplasty", "Blepharoplasty", "Fillers", "Thread Lift", "Face Lift", "Otoplasty"] },
  { name: "Body", icon: "💪", services: ["Liposuction", "Abdominoplasty", "Body Sculpting", "Fat Transfer"] },
  { name: "Breast", icon: "🩺", services: ["Breast Augmentation", "Breast Lift", "Breast Reduction"] },
  { name: "Hair", icon: "💇", services: ["Hair Transplant", "PRP"] },
  { name: "Male", icon: "♂️", services: ["Gynaecomastia"] },
  { name: "Skin", icon: "🧴", services: ["Scar Revision"] },
  { name: "Intimate", icon: "🏥", services: ["Labiaplasty"] },
];

export const doctorInfo = {
  name: "Dr. Murali K",
  title: "Consultant Aesthetic & Plastic Surgeon",
  experience: "8+ years",
  languages: ["English", "Tamil", "Hindi"],
  specializations: ["Aesthetics", "Gynecomastia Treatment"],
  education: [
    { degree: "MBBS", institution: "Rajah Muthiah Medical College & Hospital", year: 2003 },
    { degree: "MS (General Surgery)", institution: "Rajah Muthiah Medical College & Hospital", year: 2012 },
    { degree: "MCh (Plastic Surgery)", institution: "Stanley Medical College", year: null },
  ],
  bio: "Dr. Murali K is an expert and experienced Aesthetics and Plastic Surgeon with 8+ years of experience, specializing in Aesthetics and Gynecomastia treatment. He has been commended by his patients for his caring nature, hard working attitude, and willingness to be there for them anytime.",
};

export const statsData = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 37, suffix: "+", label: "Treatments Offered" },
  { value: 3, suffix: "", label: "Languages Spoken" },
  { value: 7, suffix: "", label: "Service Categories" },
];

export const contactFormConfig: ContactForm = {
  description: "Got doubts & questions? We'd love to hear from you! Drop us a line below and we'll get back to you.",
  fields: [
    { name: "Name", type: "text", required: true },
    { name: "Phone", type: "telephone", required: true },
    { name: "Email", type: "email", required: false },
    { name: "Message", type: "textarea", required: true },
  ],
};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
