import { GlobalContext } from "@/context/global";
import { motion, useSpring } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../footer/footer";
import { FloatingMenu, MobileNav, Nav } from "../navbar/nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { overInteractive, clickingInteractive } = useContext(GlobalContext);

  const overInteractiveRef = React.useRef(overInteractive);

  const smoothOptions = { damping: 15, stiffness: 100 };
  const mouse = {
    x: useSpring(0, smoothOptions),
    y: useSpring(0, smoothOptions),
  };
  const backupMouse = {
    x: useSpring(0, smoothOptions),
    y: useSpring(0, smoothOptions),
  };

  const manageMouseMove = (
    mouseX: number,
    mouseY: number,
    overInteractive: boolean
  ) => {
    let x = mouseX;
    let y = mouseY;

    if (overInteractive) {
      x = x - 10;
      y = y - 5;
    } else {
      x = x - 40;
      y = y - 25;
    }

    mouse.x.set(x);
    mouse.y.set(y);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      manageMouseMove(e.clientX, e.clientY, overInteractiveRef.current)
    );

    return () => {
      window.removeEventListener("mousemove", (e) =>
        manageMouseMove(e.clientX, e.clientY, overInteractiveRef.current)
      );
    };
  }, []);

  useEffect(() => {
    overInteractiveRef.current = overInteractive;
  }, [overInteractive]);

  const followMouseScale = () => {
    if (overInteractive && !clickingInteractive) {
      return 1.5;
    } else if (clickingInteractive) {
      return 1.2;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setShowFloatingMenu(true);
        } else {
          setShowFloatingMenu(false);
        }
      });
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Nav />
      <MobileNav
        show={showMobileNav}
        close={() => setShowMobileNav(false)}
      />
      <FloatingMenu
        visible={showFloatingMenu}
        toggleShow={() => setShowMobileNav((value) => !value)}
      />
      <main className="flex-grow w-full h-full">{children}</main>
      <Footer />
      <motion.div
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
        animate={{
          scale: followMouseScale(),
        }}
        className="mouse-follow"
      ></motion.div>
    </div>
  );
}
