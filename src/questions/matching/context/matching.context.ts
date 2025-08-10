import { createContext } from "react";

import type { Connection } from "@xyflow/react";

type MatchingContextValue = {
  isConnectionAllowed: (connection: Connection) => boolean;
  lockedSources: Set<string>;
  lockedTargets: Set<string>;
};

export const MatchingContext = createContext<MatchingContextValue | null>(null);
