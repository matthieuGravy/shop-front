interface ParagrapheProps {
  p: string | JSX.Element;
  className?: string;
  level: "1" | "2" | "3";
}

const Paragraphe: React.FC<ParagrapheProps> = ({ p, className, level }) => {
  switch (level) {
    case "1":
      return <p className={className}>{p}</p>;
    case "2":
      return <p className={className}>{p}</p>;
    case "3":
      return <p className={className}>{p}</p>;
    default:
      return null;
  }
};

export default Paragraphe;
