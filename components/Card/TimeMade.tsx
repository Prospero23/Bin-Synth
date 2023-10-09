"use client";

import { useState } from "react";

export default function TimeMade({ dateMade }: { dateMade: Date }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLong, setIsLong] = useState(false);

  const date = dateMade.toString().split(" ");
  const shortDate = date.slice(0, 4).join(" "); // get short date

  return <>{isLong ? dateMade.toString() : shortDate}</>;
}
