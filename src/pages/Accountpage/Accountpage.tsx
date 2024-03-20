import Profile from "../../components/users/Profile";
import { useState } from "react";

const Accountpage = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <h1>Accountpage</h1>
      <section className="">
        <button
          onClick={handleClick}
          className={`${
            open
              ? "hidden"
              : "bg-stone-600 h-20 w-auto px-8 rounded-lg text-purple-400"
          }`}
        >
          Account <br />
          informations
        </button>
        <article className={`${open ? "" : "hidden"}`}>
          <button type="button" onClick={handleClick}>
            back
          </button>
          <Profile />
        </article>
      </section>
    </div>
  );
};
export default Accountpage;
