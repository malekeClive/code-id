import service from "@/services/service";
import Link from "next/link";

export default async function Users() {
  const users = await service.getUsers();

  return (
    <ul className="flex flex-col gap-2 my-2">
      {users.map((user) => (
        <li key={user.id} className="shadow p-4 hover:bg-slate-100">
          <Link href={`/detail/${user.id}`}>
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p className="text-sm">{user.email}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
