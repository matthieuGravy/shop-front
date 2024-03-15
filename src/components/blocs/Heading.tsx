interface HeadingProps {
  title?: string | JSX.Element;
  className?: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: React.FC<HeadingProps> = ({ title, className, level }) => {
  switch (level) {
    case "h1":
      return <h1 className={className}>{title}</h1>;
    case "h2":
      return <h2 className={className}>{title}</h2>;
    case "h3":
      return <h3 className={className}>{title}</h3>;
    case "h4":
      return <h4 className={className}>{title}</h4>;
    case "h5":
      return <h5 className={className}>{title}</h5>;
    case "h6":
      return <h6 className={className}>{title}</h6>;
    default:
      return null;
  }
};

export default Heading;
