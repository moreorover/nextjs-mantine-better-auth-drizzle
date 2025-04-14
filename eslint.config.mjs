import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const importPlugin = await import("eslint-plugin-import");

const eslintConfig = [
  {
    plugins: {
      import: importPlugin.default ?? importPlugin,
    },
    rules: {
      // Organize imports
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node "builtin" modules (fs, path)
            "external", // npm modules (react, lodash)
            "internal", // Aliased paths (e.g. @/components)
            ["parent", "sibling", "index"], // Relative imports
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
