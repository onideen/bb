interface Props {
  title: string;
}

export default function CardHeader({ title }: Props) {
  return (
    <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h5>
  );
}
