"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Modal from "./modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
        router.refresh();
        onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
        onClose()
    }
  }

  return (
    <Modal
      title="welcome back"
      description="login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        providers={["github"]}
        theme="dark"
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
