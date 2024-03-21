import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/reducerConnection";

import { ButtonAction, ButtonNavLinks } from "./Buttons";

import Logout from "../users/Logout";
import AccountIcon from "../icons/AccountIcon";
import CastIcon from "../icons/CastIcon";
import CroixIcon from "../icons/CroixIcon";
import HamburgerIcon from "../icons/HamburgerIcon";
import WishIcon from "../icons/WishIcon";
import Navlinks from "./Navlinks";

function Topbar() {
  // Dans Topnav.tsx
  const { user } = useSelector((state: { user: UserState }) => state.user);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  const closeNav = () => {
    setIsNavVisible(false);
  };
  const toggleAccount = () => {
    setIsOpen(!isOpen);
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
    if (scrollYProgress.get() > 0.1) {
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
        animate={isHidden ? "isHidden" : "isVisible"}
        transition={{ duration: 0.3 }}
        className="fixed top-0 w-full z-40"
      >
        <nav
          className={`flex justify-between items-center text-stone-200 min-h-14 relative bg-stone-600 ${
            isNavVisible ? "shadow-lg bg-transparent" : "shadow-none"
          }`}
        >
          <button
            onClick={toggleNav}
            className={`lg:hidden xl:hidden flex-initial w-10 grid place-items-center text-yellow-300 ${
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
            <ul className="transition-all duration-300 lg:min-w-full lg:flex-1 flex justify-center text-center min-h-[100vh] flex-col lg:flex-row gap-y-5 lg:min-h-0 lg:h-14 -top-4 left-0 sticky bg-stone-600 w-full md:w-1/2  lg:bg-transparent relative ">
              <button
                onClick={toggleNav}
                className="lg:hidden xl:hidden absolute right-5 top-5"
              >
                {/* croix */}
                <CroixIcon />
              </button>

              <Navlinks onClick={toggleNav} />
            </ul>
          </section>
          <section
            className={`text-right flex-2 z-50 py-2 ${
              isNavVisible ? "hidden" : "flex"
            }`}
          >
            <ul className="flex-1 flex justify-end pe-3 self-center ">
              {user ? (
                <>
                  {/* My acount*/}
                  <li>
                    <ButtonAction
                      children={<AccountIcon />}
                      onClick={toggleAccount}
                    />
                  </li>
                  <li className="px-2"></li>
                  {/* <whishlist*/}
                  <li className="px-2">
                    <NavLink to="/wish" onClick={closeNav}>
                      <WishIcon />
                    </NavLink>
                  </li>
                  {/* Cast */}
                  <li className="px-2">
                    <NavLink to="/cast" onClick={closeNav}>
                      <CastIcon />
                    </NavLink>
                  </li>
                </>
              ) : (
                <ButtonAction
                  children={<AccountIcon />}
                  onClick={toggleAccount}
                />
              )}
            </ul>
          </section>
          <section
            className={`absolute top-16 right-2 bg-stone-600 rounded-lg ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <ul className="w-32 text-center py-2 flex flex-col gap-y-2 ">
              {user ? (
                <>
                  <li>
                    <ButtonNavLinks
                      to="/account"
                      text="Account"
                      onClick={toggleAccount}
                    />
                  </li>
                  <li>
                    <Logout onClick={toggleAccount} />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <ButtonNavLinks
                      to="/login"
                      text="Login"
                      onClick={toggleAccount}
                    />
                  </li>
                  <li>
                    <ButtonNavLinks
                      to="/register"
                      text="Sign up"
                      onClick={toggleAccount}
                    />
                  </li>
                </>
              )}
            </ul>
          </section>
        </nav>
      </motion.header>
    </>
  );
}

export default Topbar;
