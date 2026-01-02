import {
  AboutStats,
  ContactForm,
  ProjectList,
  ServicesList,
} from "@/components/landing";
import MainLayout from "@/components/mainlayout";
import { AnimatedText, InteractiveLink } from "@/components/shared";
import { ArrowIcon, BarcodeIcon } from "@/icons";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const isBrowser = typeof document !== "undefined";
    const AOS = isBrowser ? require("aos") : undefined;

    AOS.init({
      once: true,
      mirror: false,
      duration: 1000,
    });
  });

  return (
    <MainLayout>
      <NextSeo title="StriTech — Digital Product & Innovation Agency" />
      <div className="w-full max-w-[2000px] mx-auto px-[4.5rem] py-20 h-full min-h-screen flex flex-col justify-between overflow-hidden tab:px-8 sm-tab:pt-10 phone:px-4">
        <div className="w-full flex justify-between tab:flex-grow">
          <section className="max-w-[500px] z-[2] w-full lg-tab:max-w-xs sm-tab:text-white">
            <p className="text-sm">
              “ At Striving Technologies, we see creativity as the driving force
              behind innovation. As a full-service creative agency, we want to
              transform forward-thinking ideas into extraordinary solutions.
            </p>
            <p className="text-sm mt-2 sm-tab:mt-1">
              In our journey of crafting brand identities, designing
              user-friendly websites, and launching dynamic marketing campaigns,
              we invest every project with unwavering dedication and a spirited
              enthusiasm that inspires greatness. ”
            </p>
            <div className="text-white italic mt-5 sm-tab:mt-3">
              <p>Ochuko P</p>
              <p>Creative Director</p>
            </div>
          </section>
          <div className="relative h-full">
            <Image
              className="max-w-xl service-image sm-laptop:max-w-lg lg-tab:max-w-md tab:absolute tab:-right-48 phone:-right-52"
              src="/images/dark-blob-tinted.avif"
              width={1024}
              height={986}
              alt="Dark Blob"
            />
          </div>
        </div>
        <section className="flex w-full justify-between items-end flex-wrap gap-4 z-[2]">
          <div className="text-8xl lg-tab:text-7xl">
            <div className="-mb-6 lg-tab:mb-0">
              <h1 className="arapey-regular-italic italic text-secondary">
                Creativity
              </h1>
            </div>
            <div className="flex gap-x-4  flex-wrap">
              <h1>Meets</h1>
              <h1 className="text-primary italic">Innovation</h1>
            </div>
          </div>
          <div className="mt-20 ml-auto">
            <InteractiveLink
              href="/#contact"
              wrapperType="link"
              className="px-4 py-3 text-xl flex items-center gap-4 rounded-full border border-white bg-black hover:bg-primary hover:border-black hover:text-black"
            >
              Let's connect
              <ArrowIcon className="h-4 w-auto" />
            </InteractiveLink>
          </div>
        </section>
      </div>
      <section
        className="py-20 grey-gradient"
        id="about-us"
      >
        <div className="w-full max-w-[2000px] mx-auto px-[4.5rem] tab:px-8 phone:px-4">
          <div className="flex gap-10 justify-between tab:flex-wrap">
            <h2 className="bruno-ace text-primary flex items-center h-min gap-2 whitespace-nowrap">
              <BarcodeIcon className="w-5 h-auto" /> About Us
            </h2>
            <AnimatedText
              text="Driven by creativity, innovation, and excellence, Striving
            Technologies brings together a team of industry experts, dedicated
            to crafting the extraordinary."
              className="max-w-5xl text-5xl urbanist text-white tab:text-4xl phone:text-3xl"
            />
          </div>
          <AboutStats />
        </div>
      </section>
      <section
        className="py-20 mt-10"
        id="services"
      >
        <div className="w-full max-w-[2000px] mx-auto flex gap-10 justify-between px-[4.5rem] tab:px-8 tab:flex-wrap phone:px-4">
          <h2 className="bruno-ace text-primary flex items-center h-min gap-2 whitespace-nowrap">
            <BarcodeIcon className="w-5 h-auto" /> Our Services
          </h2>
          <AnimatedText
            text="At Striving Technologies we provide creative solutions designed to elevate your brand and drive success. Our team of experts go above and beyond to surpass expectations, empowering your brand to thrive."
            className="max-w-5xl text-5xl urbanist text-white tab:text-4xl phone:text-3xl"
          />
        </div>
        <div className="border-t border-white my-20 pt-2 phone:border-none tab:mb-10">
          <div className="w-full max-w-[2000px] mx-auto mb-10 phone:hidden">
            <div className="grid grid-cols-3 gap-10 max-w-[1800px] mx-auto px-16 tab:grid-cols-2 tab:px-8">
              <div className="flex gap-4 items-center text-white">
                <ArrowIcon className="w-4 h-auto rotate-[135deg]" />
                <p>Service</p>
              </div>
              <div className="col-span-2 flex gap-4 items-center text-white tab:col-span-1">
                <ArrowIcon className="w-4 h-auto rotate-[135deg]" />
                <p>Features</p>
              </div>
            </div>
          </div>
          <ServicesList />
        </div>
      </section>
      <section
        className="w-full max-w-[2000px] mx-auto px-[4.5rem] py-20 tab:pt-10 tab:px-8 phone:px-4"
        id="work"
      >
        <div className="mb-20">
          <h2 className="bruno-ace text-primary flex items-center h-min gap-2 justify-center mb-10 whitespace-nowrap">
            <BarcodeIcon className="w-5 h-auto" /> Client Work
          </h2>
          <h3 className="text-8xl text-center text-white mb-5 lg-tab:text-7xl">
            <span className="arapey-regular-italic font-semibold">
              Featured
            </span>{" "}
            Projects!
          </h3>
          <p className="text-center text-sm">
            Discover our range of innovative products carefully crafted for each
            of our customers to unlock their potential. <br />
            Each product is thoughtfully designed to deliver outstanding
            results.
          </p>
        </div>
        <div className="w-full mb-20">
          <ProjectList />
          {/* <div className="flex justify-center">
            <InteractiveLink
              href="/client-work"
              className="px-4 py-3 text-xl flex items-center gap-4 rounded-full border w-min whitespace-nowrap border-white bg-black hover:bg-primary hover:border-black hover:text-black"
            >
              View More
              <ArrowIcon className="h-4 w-auto" />
            </InteractiveLink>
          </div> */}
        </div>
      </section>
      <section
        className="px-[4.5rem] py-20 grey-gradient-reverse tab:px-8 phone:px-4 phone:pt-10"
        id="contact"
      >
        <div className="w-full max-w-[2000px] mx-auto grid grid-cols-2 gap-10 tab:grid-cols-1">
          <div>
            <h1 className="text-8xl text-primary mb-10 lg-tab:text-7xl">
              Let's{" "}
              <span className="arapey-regular-italic bg-gradient-to-r from-primary to-[#8C764A] text-transparent bg-clip-text">
                Connect
              </span>
            </h1>
            <p className="text-sm max-w-md italic text-white mb-10">
              Whether you have a question, or want to discuss a potential
              project, our team at StriTech is here to help. Please fill out the
              form below and we will get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
          <div className="w-full flex items-center h-full justify-center tab:hidden">
            <Image
              className="max-w-lg service-image lg-tab:max-w-md"
              src="/images/dark-blob.avif"
              width={1024}
              height={986}
              alt="Dark Blob"
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
