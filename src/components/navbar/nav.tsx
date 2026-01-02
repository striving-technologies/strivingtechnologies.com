import { InteractiveLink } from "@/components/shared";
import work from "@/data/work-pages.json";
import { CloseIcon, EmailIcon, MenuIcon } from "@/icons";
import Image from "next/image";
import { useEffect, useRef } from "react";

const links = [
  { href: "/#", label: "Home" },
  { href: "/#work", label: "Work", extra: work.length },
  { href: "/#services", label: "Services" },
];

export const Nav = () => {
  return (
    <nav className="w-full max-w-[2000px] mx-auto flex justify-between items-center py-5 px-[4.5rem] tab:px-8 phone:px-4">
      <InteractiveLink
        href="/"
        wrapperType="link"
      >
        <Image
          src="/images/logo.png"
          alt="StriTech Logo"
          className="h-9 w-auto"
          width={976}
          height={256}
        />
      </InteractiveLink>
      <ul className="flex gap-16 uppercase text-sm lg-tab:hidden">
        {links.map((link) => (
          <li
            key={link.href}
            className="nav-link relative group hover:text-primary"
          >
            <InteractiveLink
              href={link.href}
              className="flex items-end"
              wrapperType="link"
            >
              {link.label}
              {link.extra && (
                <>
                  &nbsp;
                  <span className="text-xs mb-0.5 group-hover:text-white">
                    ({link.extra})
                  </span>
                </>
              )}
            </InteractiveLink>
          </li>
        ))}
      </ul>
      <ul className="flex gap-16 lg-tab:hidden">
        <li>
          <InteractiveLink href="/#contact">
            <EmailIcon className="w-6" />
          </InteractiveLink>
        </li>
      </ul>
    </nav>
  );
};

export const MobileNav = (props: { show: boolean; close: () => void }) => {
  const closeMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.show) {
      closeMenuRef.current?.focus();
    }
  }, [props.show]);
  return (
    <nav
      className={`p-10 fixed z-[11] w-screen max-w-xl h-screen grey-gradient-round flex flex-col transition-all duration-500 ${props.show ? "right-0" : "-right-full"
        } tab:max-w-none`}
    >
      <div className="flex justify-end items-center">
        <InteractiveLink>
          <button
            onClick={props.close}
            className="text-white rounded-full border border-transparent hover:border-white"
            aria-label="Close Menu"
            ref={closeMenuRef}
          >
            <CloseIcon className="h-12 w-auto text-white tab:h-7" />
          </button>
        </InteractiveLink>
      </div>
      <div className="flex-grow flex items-center">
        <ul className="flex flex-col gap-16 uppercase text-xl">
          {links.map((link) => (
            <li
              key={link.href}
              className="nav-link w-min whitespace-nowrap relative group text-white hover:text-primary"
            >
              <InteractiveLink
                href={link.href}
                className="flex items-end"
                wrapperType="link"
                onClick={props.close}
              >
                {link.label}
                {link.extra && (
                  <>
                    &nbsp;
                    <span className="text-xs mb-0.5 group-hover:text-white">
                      ({link.extra})
                    </span>
                  </>
                )}
              </InteractiveLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export const FloatingMenu = (props: {
  visible: boolean;
  toggleShow: () => void;
}) => {
  return (
    <div
      className={`fixed top-20 right-20 z-10 transition-all duration-500 lg-tab:top-5 lg-tab:right-8 ${props.visible ? "scale-100" : "scale-0 lg-tab:scale-100"
        }`}
    >
      <InteractiveLink
        className="p-1 text-xl flex items-center rounded-full border text-white border-white bg-black cursor-pointer hover:bg-primary hover:border-black hover:text-black"
        onClick={props.toggleShow}
        aria-label="Toggle Menu"
      >
        <MenuIcon className="h-12 w-auto tab:h-7" />
      </InteractiveLink>
    </div>
  );
};
