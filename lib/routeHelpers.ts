import { type AuthOptions } from "next-auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UnauthorizedError, ForbiddenError } from "./exceptions";
import { type ExtendedSession } from "./types";

export async function authenticateSession( // should find user in db instead of bs i am doing right now
  authOptions: AuthOptions,
): Promise<ExtendedSession> {
  const session = await getServerSession(authOptions);
  if (session == null) throw new UnauthorizedError("No session info");
  if (session.user == null)
    throw new UnauthorizedError("You must be logged in.");

  return session as ExtendedSession;
}
export function verifyAuthorship(userId: string, authorId: string) {
  // this may not be actually a string two
  if (userId !== authorId) {
    throw new ForbiddenError("Operation not permitted.");
  }
}

export function handleError(error: Error) {
  switch (error.constructor) {
    case UnauthorizedError:
      return NextResponse.json({ error: error.message }, { status: 401 });
    case ForbiddenError:
      return NextResponse.json({ error: error.message }, { status: 403 });
    default:
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
  }
}
