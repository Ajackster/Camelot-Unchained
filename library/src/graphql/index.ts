/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Types are accumulated and exported from fragments, queries, or types
export * from './fragments';
export * from './queries';
export * from './schema';

import fragments from './fragments';
import queries from './queries';
import * as schema from './schema';

export {
  fragments,
  queries,
  schema,
};
