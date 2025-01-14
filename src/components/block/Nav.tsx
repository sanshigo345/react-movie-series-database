import { Link } from "react-router-dom";
import classNames from "classnames";

interface NavProps {
  links: Array<{ href: string; text: string }>;
  children?: React.ReactNode;
}

const NavItem: React.FC<{ href: string; text: string }> = ({ href, text }) => {
  const navLinkClass = classNames(
    "bg-slate-50 py-3 px-4 md:px-6 text-secondary-700 border-b-4 border-slate-100 rounded-md",
    "hover:bg-secondary-500 hover:text-white hover:border-secondary-800"
  );
  return (
    <li>
      <Link className={navLinkClass} to={href}>
        {text} <span className="sr-only">(current)</span>
      </Link>
    </li>
  );
};

const Nav: React.FC<NavProps> = ({ links, children }) => {
  return (
    <nav className="flex flex-col items-center my-8">
      <ul className="flex justify-center gap-1 md:gap-2 mt-3">
        {links.map((link, index) => (
          <NavItem key={index} href={link.href} text={link.text} />
        ))}
      </ul>
      {children && children}
    </nav>
  );
};

export default Nav;
