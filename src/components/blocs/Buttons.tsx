import { NavLink } from "react-router-dom";

interface ButtonNavInTextProps {
  to: string;
  text: string;
  className?: string;
  onClick?: () => void;
}
interface ButtonActionProps {
  children: string | JSX.Element | React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface ButtonNavLinksProps {
  to: string;
  text: string;
  className?: string;
  onClick?: () => void;
}
const ButtonNavInText: React.FC<ButtonNavInTextProps> = ({
  to,
  text,
  className,
  onClick,
}) => {
  return (
    <NavLink to={to} className={`${className}`} onClick={onClick}>
      {text}
    </NavLink>
  );
};

const ButtonNavLinks: React.FC<ButtonNavLinksProps> = ({
  to,
  text,
  className,
  onClick,
}) => {
  return (
    <NavLink to={to} className={`${className}`} onClick={onClick}>
      {text}
    </NavLink>
  );
};

const ButtonAction: React.FC<ButtonActionProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
};

export { ButtonNavInText, ButtonAction, ButtonNavLinks };
