/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: JB (jb@codecorsair.com)
 * @Date: 2016-09-29 17:10:28
 * @Last Modified by: JB (jb@codecorsair.com)
 * @Last Modified time: 2016-09-29 17:12:10
 */

export enum skillTracks {
  NONE = 0,

  PRIMARYWEAPON = 1 << 0,
  SECONDARYWEAPON = 1 << 1,
  BOTHWEAPONS = PRIMARYWEAPON | SECONDARYWEAPON,
  VOICE = 1 << 2,
  MIND = 1 << 3,
  // ANY SKILL TRACK WITH THIS FLAG HAS SOME SORT OF ERROR OR CONFLICT.
  ERRORFLAG = 1 << 28,
  // SPECIAL FLAGS THAT ARE NOT A FIXED SLOT. SKILLS USING ONE OF THESE
  // WILL END UP USING ONE OF THE SLOTS, WITH THE CHOICE DEPENDING ON WHAT'S CURRENTLY
  // IN USE BY OTHER SKILLS. USE SKILL.RESOLVETRACKCHOICES TO COMPUTE THAT.
  EITHERWEAPONPREFERPRIMARY = 1 << 29,
  EITHERWEAPONPREFERSECONDARY = 1 << 30,
  CHOICEFLAGS = EITHERWEAPONPREFERPRIMARY | EITHERWEAPONPREFERSECONDARY,
  ALL = ~0 & ~(CHOICEFLAGS | ERRORFLAG),
}
