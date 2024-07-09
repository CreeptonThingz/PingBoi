import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends("eslint:recommended"),
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},

			ecmaVersion: 2021,
			sourceType: "module",
		},

		rules: {
			"handle-callback-err": "off",
			"max-nested-callbacks": [
				"error",
				{
					max: 4,
				},
			],
			"no-console": "off",
			"no-empty-function": "error",
			"no-lonely-if": "error",
			"no-shadow": [
				"error",
				{
					allow: ["err", "resolve", "reject"],
				},
			],
			"no-var": "error",
			"prefer-const": "error",
			"spaced-comment": "error",
			yoda: "error",
		},
	},
];
