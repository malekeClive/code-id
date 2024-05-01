import service from "@/services/service";
import Link from "next/link";

export default async function Albums({ userId }: { userId: Number }) {
  const albums = await service.getAlbumsByUserId(userId);

  return (
    <div className="max-w-xl mx-auto grid grid-cols-3 gap-6 m-6">
      {albums.map((album) => (
        <Link
          key={album.id}
          href={`/detail/${userId}/photos/${album.id}`}
          className="shadow flex flex-col gap-3"
        >
          <div className="p-4">
            <p>{album.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
