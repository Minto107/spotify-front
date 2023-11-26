"use client"

import { AuthModal } from "@/components/AuthModal";
import { RegisterModal } from "@/components/RegisterModal";
import { UploadModal } from "@/components/UploadModal";
import { useEffect, useState } from "react"

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return null;

  return (
    <>
      <AuthModal />
      <RegisterModal />
      <UploadModal />
    </>
  );
}

export default ModelProvider;