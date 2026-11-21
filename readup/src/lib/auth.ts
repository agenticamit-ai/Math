import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "readup_session";
const MAX_AGE_S = 60 * 60 * 24 * 30;

export type AuthSession = { pid: string; mode: "parent" | "reader"; rid?: string };

function secret(): Uint8Array {
  const s = process.env.SESSION_SECRET;
  if (!s || s === "change-me") {
    if (process.env.NODE_ENV === "production") throw new Error("SESSION_SECRET must be set to a long random string.");
    return new TextEncoder().encode("readup-dev-only-secret-do-not-use-in-production");
  }
  return new TextEncoder().encode(s);
}

export async function getSession(): Promise<AuthSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.pid !== "string") return null;
    return {
      pid: payload.pid,
      mode: payload.mode === "reader" ? "reader" : "parent",
      rid: typeof payload.rid === "string" ? payload.rid : undefined,
    };
  } catch {
    return null;
  }
}

export async function setSession(s: AuthSession): Promise<void> {
  const token = await new SignJWT({ ...s })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_S}s`)
    .sign(secret());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

export async function clearSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** Parent pages. In reader mode, the parent must re-enter their password. */
export async function requireParent(): Promise<AuthSession> {
  const s = await getSession();
  if (!s) redirect("/login");
  if (s.mode !== "parent") redirect("/parent/unlock");
  return s;
}

/** Reader pages. */
export async function requireReader(): Promise<AuthSession & { rid: string }> {
  const s = await getSession();
  if (!s) redirect("/login");
  if (!s.rid || s.mode !== "reader") redirect("/switch");
  return s as AuthSession & { rid: string };
}
