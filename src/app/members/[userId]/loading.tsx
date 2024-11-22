import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <Spinner size="md" label="Loading..." color="primary" />
    </div>
  );
}
