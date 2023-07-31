import { User } from "./__generated__/resolvers-types";

export interface SurfSpotManagerrzContext {
  req: {
    headers: {
      authorization: string | undefined;
    };
  };
  user: User | null;
}
