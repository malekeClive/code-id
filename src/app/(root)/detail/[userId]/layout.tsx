import service from "@/services/service";
import UserDetail from "./components/user";

export default async function detailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: Number;
  };
}) {
  const userId = Number(params.userId);
  const users = await service.getUsers();
  const user = users.find((user) => user.id === userId);

  if (!user)
    return (
      <main>
        <p className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center text-2xl">
          Oops.. user not found
        </p>
      </main>
    );

  const { name, email } = user;

  return (
    <main>
      <div className="max-w-xl mx-auto my-6">
        <h3 className="text-2xl">{name}</h3>
        <p>{email}</p>
      </div>

      <UserDetail user={user}>{children}</UserDetail>
    </main>
  );
}
