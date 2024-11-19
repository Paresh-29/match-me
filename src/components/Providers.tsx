import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar />
      {children}
    </NextUIProvider>
  );
}
