import Image from "next/image";

export const ServicesList = () => {
  const services = [
    {
      title: "Brand Identity",
      icon: "/images/service-brand-identity-icon.svg",
      features: [
        "I. Logo Design",
        "II. Brand Strategy",
        "III. Identity Development",
      ],
      image: {
        src: "/images/service-brand-identity.png",
        width: 512,
        height: 468,
      },
    },
    {
      title: "Interactive Design",
      icon: "/images/service-interactive-design-icon.svg",
      features: [
        "I. Legacy Modernization",
        "II. Solution Design",
        "III. User Interface & Experience Design",
        "IV. Mobile-First Systems",
      ],
      image: {
        src: "/images/service-interactive-design.png",
        width: 512,
        height: 468,
      },
    },
    {
      title: "Engineering",
      icon: "/images/service-engineering-icon.svg",
      features: [
        "I. Web Engineering & Development",
        "II. Software Engineering & Architecture",
        "III. Cloud Infrastructure & Deployments",
        "IV. Machine Learning & Data Analytics",
      ],
      image: {
        src: "/images/service-engineering.png",
        width: 512,
        height: 468,
      },
    },
    {
      title: "SEO / Marketing",
      icon: "/images/service-seo-marketing-icon.svg",
      features: [
        "I. Search Engine Optimization",
        "II. Engagement Metrics & Analytics",
        "III. Content Marketing",
        "IV. Graphics Design",
      ],
      image: {
        src: "/images/service-seo-marketing.png",
        width: 512,
        height: 468,
      },
    },
  ];
  return (
    <div>
      {services.map((service, index) => (
        <div
          key={index}
          className="w-full transition-all duration-500 cursor-default group tab:text-white hover:text-white hover:bg-mono-grey-dark tab:hover:bg-transparent"
        >
          <div className="grid grid-cols-3 gap-10 px-16 py-12 max-w-[1800px] mx-auto tab:grid-cols-2 tab:px-8 phone:grid-cols-1 phone:px-4">
            <div className="flex gap-5 items-center h-min tab:gap-2 phone:-ml-2">
              <img
                src={service.icon}
                alt={service.title}
                className="w-8 h-8 transition-all duration-500 opacity-40 group-hover:opacity-100"
              />
              <h1 className="text-3xl">{service.title}</h1>
            </div>
            <div>
              <ul className="m-0">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-lg mb-1"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative tab:hidden">
              <Image
                src={service.image.src}
                width={service.image.width}
                height={service.image.height}
                alt={service.title}
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-500 service-image"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
