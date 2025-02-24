import Link from "next/link";

interface NavElementProps {
  title: string,
  to: string,
  active?: boolean;
}

function NavElement({ title, to }: NavElementProps) {
  return (
    <li className="p-1 font-normal text-gray-800">
      <Link href={to} className="flex items-center">
        {title}
      </Link>
    </li>
  );
}

export default NavElement;
