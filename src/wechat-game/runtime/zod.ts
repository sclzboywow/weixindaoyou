// WeChat bundles only use this subset of Zod's classic runtime. Importing the
// package root through `z` also retains locales and JSON Schema conversion
// helpers, which are not used by the mini game and consume scarce subpackage
// space. Keep this list aligned with runtime `z.*` usage in bundled sources.
import {
  any,
  array,
  boolean,
  custom,
  date,
  discriminatedUnion,
  email,
  enum as enumSchema,
  json,
  literal,
  nativeEnum,
  never,
  number,
  object,
  record,
  string,
  tuple,
  undefined as undefinedSchema,
  union,
  unknown,
  url,
  uuid,
} from '../../../node_modules/zod/v4/classic/schemas.js';
import * as coerce from '../../../node_modules/zod/v4/classic/coerce.js';
import { ZodError } from '../../../node_modules/zod/v4/classic/errors.js';
import { ZodIssueCode } from '../../../node_modules/zod/v4/classic/compat.js';

export { ZodError, ZodIssueCode };

export const z = {
  any,
  array,
  boolean,
  coerce,
  custom,
  date,
  discriminatedUnion,
  email,
  enum: enumSchema,
  json,
  literal,
  nativeEnum,
  never,
  number,
  object,
  record,
  string,
  tuple,
  undefined: undefinedSchema,
  union,
  unknown,
  url,
  uuid,
  ZodError,
  ZodIssueCode,
};

export default z;
