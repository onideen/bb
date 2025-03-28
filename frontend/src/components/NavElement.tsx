import { NavLink } from "react-router-dom";

interface NavElementProps {
  title: string;
  to: string;
  active?: boolean;
}

function NavElement({ title, to }: NavElementProps) {
  return (
    <li>
      <NavLink to={to} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
        {title}
      </NavLink>
    </li>
  );
}

export default NavElement;
