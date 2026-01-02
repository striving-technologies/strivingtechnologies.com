import { ArrowIcon } from "@/icons";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InteractiveLink } from "../shared";

const MotionImage = motion.create(Image);

const Footer = () => {
  const companyLinks = [
    {
      text: "About",
      link: "/#about",
    },
    {
      text: "Services",
      link: "/#services",
    },
    {
      text: "Contact",
      link: "/#contact",
    },
    {
      text: "Careers",
      link: "https://www.linkedin.com/company/striving-technologies/jobs/",
      external: true,
    },
  ];

  const socialLinks = [
    {
      text: "X (Twitter)",
      link: "https://x.com/StriTechHQ",
      external: true,
    },
    {
      text: "LinkedIn",
      link: "https://www.linkedin.com/company/striving-technologies",
      external: true,
    },
  ];

  const [path, setPath] = useState("/");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  const reachOutControls = useAnimation();
  const reachOutRef = useRef(null);
  const reachOutInView = useInView(reachOutRef, { amount: 0.8 });

  const logoControls = useAnimation();
  const logoRef = useRef(null);
  const logoInView = useInView(logoRef, { amount: 0.2 });

  useEffect(() => {
    if (reachOutInView) {
      reachOutControls.start("visible");
    } else {
      reachOutControls.start("hidden");
    }
  }, [reachOutInView]);

  useEffect(() => {
    if (logoInView) {
      logoControls.start("visible");
    } else {
      logoControls.start("hidden");
    }
  }, [logoInView]);

  const animation = {
    hidden: {
      translateY: 100,
    },
    visible: {
      translateY: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <footer className="pt-20 w-full">
      <div className="px-[4.5rem] tab:px-8 phone:px-4">
        <div className="w-full max-w-[2000px] mx-auto">
          <div className="w-full grid grid-cols-3 gap-4 lg-tab:grid-cols-2 lg-tab:gap-y-20">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="uppercase">Company</h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {companyLinks.map((link, index) => (
                    <li
                      key={index}
                      className="nav-link w-min relative text-white hover:text-primary"
                    >
                      <InteractiveLink
                        href={link.link}
                        wrapperType={link.external ? undefined : "link"}
                        className="flex items-center uppercase gap-2"
                        target={link.external ? "_blank" : ""}
                        rel="noopener noreferrer"
                      >
                        <ArrowIcon className="h-4 w-auto" /> {link.text}
                      </InteractiveLink>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 phone:hidden">
                &copy; {new Date().getFullYear()} Striving Technologies. <br />
                All Rights Reserved
              </p>
            </div>
            <motion.div
              ref={reachOutRef}
              animate={reachOutControls}
              className="lg-tab:order-3 lg-tab:col-span-full phone:mb-5"
            >
              <h3 className="uppercase mx-auto w-min whitespace-nowrap">
                Reach Out To Us
              </h3>
              <div className="mt-5">
                <p className="flex justify-center">
                  <InteractiveLink
                    href="/#contact"
                    wrapperType="link"
                    className="px-4 py-3 flex gap-4 items-center max-w-min whitespace-nowrap rounded-full text-xl border border-white bg-black hover:bg-primary hover:border-black hover:text-black"
                  >
                    Let's connect
                    <ArrowIcon className="h-6 w-auto" />
                  </InteractiveLink>
                </p>
              </div>
            </motion.div>
            <div className="flex justify-end lg-tab:justify-start">
              <div>
                <h4 className="uppercase">Socials</h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {socialLinks.map((link, index) => (
                    <li
                      key={index}
                      className="nav-link w-min relative text-white hover:text-primary"
                    >
                      <InteractiveLink
                        href={link.link}
                        className="flex items-center uppercase gap-2 whitespace-nowrap"
                        target={link.external ? "_blank" : ""}
                        rel="noopener noreferrer"
                      >
                        <ArrowIcon className="h-4 w-auto" /> {link.text}
                      </InteractiveLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full mt-20 px-2 overflow-hidden"
        ref={logoRef}
        animate={logoControls}
      >
        <MotionImage
          src="/images/logo-3x.png"
          width={2928}
          height={768}
          alt="Striving Technologies Logo"
          className="w-full h-auto"
          variants={animation}
        />
      </motion.div>
      <div className="px-4">
        <p className="hidden phone:block">
          &copy; {new Date().getFullYear()} Striving Technologies. All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
