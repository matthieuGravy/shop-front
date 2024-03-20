import { ButtonNavLinks } from "./Buttons";
interface NavlinksProps {
  onClick: () => void;
}

const Navlinks: React.FC<NavlinksProps> = ({ onClick }) => {
  const Links = [
    { name: "Home", path: "/" },
    { name: "store", path: "/store" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <>
      {Links.map((link, index) => {
        return (
          <ButtonNavLinks
            key={index}
            to={link.path}
            text={link.name}
            onClick={onClick}
            className="text-2xl text-white"
          />
        );
      })}
    </>
  );
};

export default Navlinks;
