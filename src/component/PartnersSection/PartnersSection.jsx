const partners = [
  {
    name: "TechCorp",
    logo: "https://via.placeholder.com/100", // Replace with actual logo URL
    description: "Providing state-of-the-art technology solutions.",
  },
  {
    name: "EduGlobal",
    logo: "https://via.placeholder.com/100",
    description: "Partnering to enhance global education initiatives.",
  },
  {
    name: "SkillForge",
    logo: "https://via.placeholder.com/100",
    description: "Fostering skill development through innovative programs.",
  },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-lightGray">
      <div className="container mx-auto px-6 space-y-10">
        {/* Section Title */}
        <div className="text-center">
          <h3 className="text-primaryColor text-xl font-bold uppercase">
            Our Partners
          </h3>
          <h2 className="text-4xl font-extrabold text-darkGray mt-2">
            Collaborating for Excellence
          </h2>
          <p className="text-muted text-lg mt-4">
            We proudly collaborate with industry leaders and educational
            institutions to provide top-notch services.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-lg font-bold text-darkGray">
                {partner.name}
              </h3>
              <p className="text-muted text-center text-sm mt-2">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
