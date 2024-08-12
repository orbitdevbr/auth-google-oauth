"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { KeySquare, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function GoogleAuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleGoogleAuth = useCallback(
    async (token: string) => {
      // TODO: verificar token no backend (Next API Route)
      const response = await axios.post("/api/auth/google", {
        access_token: token,
      });

      console.log("response", response);

      if (response.status !== 200) {
        router.push("/login");
        return;
      }

      const { jwt } = response.data;

      if (!jwt) {
        router.push("/login");
        return;
      }

      router.push("/");

      setLoading(false);
    },
    [router]
  );

  useEffect(() => {
    const hash = window.location.hash;
    const params = hash.split("&");
    const token = params
      .find((param) => param.startsWith("access_token="))
      ?.split("=")[1];

    console.log("hash", hash, "token:", token);

    if (!token) {
      router.push("/login");
      return;
    }

    handleGoogleAuth(token);
  }, [router, handleGoogleAuth]);

  return (
    <>
      <section className="grid place-content-center min-h-dvh bg-slate-100">
        <Card>
          <CardHeader>
            <CardTitle>Validando o login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {loading && (
                <>
                  <Loader2 className="animate-spin" />
                  <p>Carregando</p>
                </>
              )}
              {!loading && (
                <>
                  <KeySquare className="text-green-500" />
                  <p>Login com sucesso</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
