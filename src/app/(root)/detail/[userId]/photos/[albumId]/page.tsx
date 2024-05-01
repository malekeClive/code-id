import service from "@/services/service";
import Image from "next/image";

export default async function Photos({
  params,
}: {
  params: { albumId: Number };
}) {
  const albumId = params.albumId;

  const photos = await service.getPhotosByAlbumId(albumId);

  return (
    <div className="max-w-xl mx-auto grid grid-cols-3 gap-6 m-6">
      {photos.map((photo) => (
        <div key={photo.id} className="relative shadow flex flex-col gap-3">
          <Image alt={photo.title} src={photo.thumbnailUrl} fill />
          <div className="p-4">
            <p>{photo.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
