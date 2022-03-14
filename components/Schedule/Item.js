import Link from "next/link";
export default function ScheduleItem({ item }) {
  const time = new Date(item.time);
  return (
    <Link href={`/schedule/${item.slug}`}>
      <div>
        {time.getHours()} - {item.title}
      </div>
    </Link>
  );
}
