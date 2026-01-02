import { ArrowIcon } from "@/icons";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export const AboutStats = () => {
  const stats = [
    {
      count: "I.",
      title: "Years of Experience",
      value: "5",
      className: "mt-20 sm-tab:mt-0",
      bgMedia: {
        url: "/images/about-experience.jpg",
        width: 3400,
        height: 3400,
      },
    },
    {
      count: "II.",
      title: "Completed Projects",
      value: "4",
      bgMedia: {
        url: "/images/about-projects.jpg",
        width: 1728,
        height: 1728,
      },
    },
    {
      count: "III.",
      title: "Satisfied Clients",
      value: "4",
      className: "mt-20 lg-tab:mt-0",
      bgMedia: {
        url: "/images/about-clients.jpg",
        width: 2912,
        height: 2912,
      },
    },
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView]);

  const animation = {
    hidden: {
      opacity: 0,
      translateY: 100,
    },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-3 mt-32 gap-20 lg-tab:grid-cols-2 tab:mt-20 sm-tab:grid-cols-1 sm-tab:gap-10 phone:gap-5"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
    >
      {stats.map(({ count, title, value, bgMedia, className }) => (
        <motion.div
          key={count}
          className={`w-full h-full ${className ? className : ""}`}
          variants={animation}
        >
          <div className="rounded-xl border border-mono-grey cursor-default aspect-square w-full max-w-xs mx-auto mt-20 overflow-hidden group relative transition-all duration-500 sm-tab:max-w-full hover:scale-110 sm-tab:hover:scale-100 tab:mt-10">
            <div className="w-full h-full flex flex-col justify-between text-white z-[4] p-8 absolute top-0 left-0 bg-black bg-opacity-30">
              <p className="flex justify-between items-center text-lg">
                <span>{count} </span>
                <span>{title}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-7xl">
                  {value}
                  {count === "I." ? "+" : ""}
                </span>
                <ArrowIcon className="w-16 h-auto" />
              </p>
            </div>
            <Image
              className="w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-blend-darken sm-tab:opacity-100"
              src={bgMedia.url}
              width={bgMedia.width}
              height={bgMedia.height}
              alt={title}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
