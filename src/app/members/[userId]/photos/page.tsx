import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import React from "react";

export default async function PhotoPage({
  params,
}: {
  params: { userId: string };
}) {
  const photos = await getMemberPhotosByUserId(params.userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-default">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid gird-cols-5 gap-3">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id}>
                <Image
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square w-full h-full max-w-[200px] max-h-[200px]"
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
