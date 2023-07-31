import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./api/schema.graphql",
  generates: {
    "./api/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        maybeValue: "T | null | undefined",
        contextType: "../context#SurfSpotManagerrzContext",
      },
    },
  },
};

export default config;
