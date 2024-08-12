"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeySquare } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http%3A//localhost:3000/auth/google/callback&client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}`;

  return (
    <>
      <section className="grid place-content-center min-h-dvh bg-slate-100">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild className="flex gap-2">
              <Link href={authUrl}>
                <KeySquare />
                Login com Google
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
