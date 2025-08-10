import { createContext } from "react";
import type { Connection } from "@xyflow/react";

export type MatchingConnectContextValue = {
  isConnectionAllowed: (connection: Connection) => boolean;
  lockedSources: Set<string>;
  lockedTargets: Set<string>;
};

export const MatchingConnectContext = createContext<MatchingConnectContextValue | null>(
  null,
);


