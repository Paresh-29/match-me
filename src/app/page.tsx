import { auth, signOut } from "@/auth";
import { Button, Link } from "@nextui-org/react";
import { div } from "framer-motion/client";
import { FaRegSmile } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

export default async function Home() {
  const sesson = await auth();
  return (
    <div>
      <h1 className="text-3xl">Hello app!</h1>

      <h3 className="text-2xl font-semibold">User session data</h3>
      {sesson ? (
        <div>
          <pre>{JSON.stringify(sesson, null, 2)}</pre>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              startContent={<FaRegSmile size={20} />}
            >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
