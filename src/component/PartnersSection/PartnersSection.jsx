import { Fade } from "react-awesome-reveal";

const partners = [
  {
    name: "W3Schools",
    logo: "https://freepngimg.com/download/icon/search/10031-w3schools-logo.png", // Replace with actual logo URL
    description:
      "Empowering developers with comprehensive web development tutorials and resources.",
  },
  {
    name: "10 Minute School",
    logo: "https://th.bing.com/th/id/R.58d2cb1e2f4faebcdb45b475e8cf4e5b?rik=S5x4zODVi3xM%2fQ&pid=ImgRaw&r=0",
    description:
      "Bringing quality education to millions with short, impactful lessons.",
  },
  {
    name: "Udemy",
    logo: "https://th.bing.com/th/id/OIP.5jcelxJYJesxteMXDgMrmAHaEK?rs=1&pid=ImgDetMain",
    description:
      "Offering a diverse range of courses to help individuals master new skills and advance their careers.",
  },
  {
    name: "Coursera",
    logo: "https://cdn.dribbble.com/userupload/4760214/file/original-eb93cc36abb805bb5c1aa76bb51b3435.png?crop=232x0-1672x1080&resize=1600x1200",
    description:
      "Collaborating with top universities and organizations to provide world-class online education.",
  },
  {
    name: "Quora",
    logo: "https://cdn.dribbble.com/users/502238/screenshots/2099895/quora-logo.png",
    description:
      "Connecting learners with a global community of experts and knowledge sharers.",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-32">
          <Fade duration={2000} direction="up">
            <h3 className="text-primaryColor text-xl font-bold uppercase">
              Our Partners
            </h3>
          </Fade>
          <Fade duration={1800} direction="up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-darkGray mt-2">
              Collaborating for Excellence
            </h2>
          </Fade>
          <Fade duration={1600} direction="up">
            <p className="text-muted text-base sm:text-lg mt-4">
              We proudly collaborate with industry leaders and educational
              institutions to provide top-notch services.
            </p>
          </Fade>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <Fade
              key={index}
              duration={1000}
              direction="up"
              delay={index * 100}
            >
              <div className="border min-h-64 rounded-md border-primaryColor p-3 flex flex-col items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-4"
                />

                <p className="text-muted text-center text-sm mt-2">
                  {partner.description}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
