import { NavLink } from "react-router-dom";

interface NavElementProps {
  title: string;
  to: string;
  active?: boolean;
}

function NavElement({ title, to }: NavElementProps) {
  return (
    <li className="p-1 font-normal text-gray-800">
      <NavLink to={to} className="flex items-center">
        {title}
      </NavLink>
    </li>
  );
}

export default NavElement;
