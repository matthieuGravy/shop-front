import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useSelector } from "react-redux";

import { RootState } from "../store/";

import AccountIcon from "../icons/AccountIcon";
import CastIcon from "../icons/CastIcon";
import CroixIcon from "../icons/CroixIcon";
import HamburgerIcon from "../icons/HamburgerIcon";
import WishIcon from "../icons/WishIcon";

function Topbar() {
  const user = useSelector((state: RootState) => state.user);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  const closeNav = () => {
    setIsNavVisible(false);
  };

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (scrollYProgress > 0.1) {
      setIsNavVisible(true);
    } else {
      setIsNavVisible(false);
    }
  }, [scrollYProgress]);

  useEffect(() => {
    if (isNavVisible) {
      // Bloquer le défilement
      document.body.style.overflow = "hidden";
    } else {
      // Autoriser le défilement
      document.body.style.overflow = "auto";
    }
  }, [isNavVisible]);

  return (
    <>
      <motion.header
        variants={{ isVisible: { y: 0 }, isHidden: { y: -56 } }}
        initial={{ y: -56 }}
        animate={
          ({ y: 0, isHidden: { y: -56 } }, isHidden ? "isHidden" : "isVisible")
        }
        transition={{ duration: 0.3 }}
        className="fixed top-0 w-full z-40"
      >
        <section
          className={`flex justify-between bg-orange-500 items-center min-h-14 ${
            isNavVisible ? "bg-transparent " : "bg-orange-500"
          }`}
        >
          <button
            onClick={toggleNav}
            className={`lg:hidden xl:hidden flex-initial w-10 grid place-items-center ${
              isNavVisible ? "hidden " : "grid"
            }`}
          >
            {/* hamburger */}
            <HamburgerIcon />
          </button>
          <section
            className={`z-50 lg:z-0 flex-3 lg:flex w-full lg:h-auto backdrop-blur lg:backdrop-blur-none bottom-0 left-0 lg:place-items-center ${
              isNavVisible ? "sticky" : "hidden"
            }`}
          >
            <ul className="transition-all duration-300 lg:min-w-full lg:flex-1 flex justify-center text-center min-h-[100vh] flex-col lg:flex-row gap-y-5 lg:min-h-0 lg:h-14 -top-4 left-0 sticky bg-orange-500 w-full md:w-1/2  lg:bg-transparent relative ">
              <button
                onClick={toggleNav}
                className="lg:hidden xl:hidden absolute right-5 top-5"
              >
                {/* croix */}
                <CroixIcon />
              </button>
              <figure className="pb-12  lg:pb-0 flex justify-center lg:px-3 ">
                <NavLink></NavLink>
              </figure>
            </ul>
          </section>
          <section
            className={`text-right flex-2 z-50 py-2 ${
              isNavVisible ? "hidden" : "flex"
            }`}
          >
            {user ? (
              <ul className="flex-1 flex justify-end pe-3 self-center ">
                {/* My acount*/}
                <li className="px-2">
                  <NavLink to="/my-account/info" onClick={closeNav}>
                    {/* account */}
                    <AccountIcon />
                  </NavLink>
                </li>
                {/* <whishlist*/}
                <li className="px-2">
                  <NavLink to="/my-account/wishlist" onClick={closeNav}>
                    <WishIcon />
                  </NavLink>
                </li>
                {/* Cast */}
                <li className="px-2">
                  <NavLink to="/my-account/cast" onClick={closeNav}>
                    <CastIcon />
                  </NavLink>
                </li>
              </ul>
            ) : (
              <NavLink to="/login" onClick={closeNav}>
                {/* account */}
                <AccountIcon />
              </NavLink>
            )}
          </section>
        </section>
      </motion.header>
    </>
  );
}

export default Topbar;
