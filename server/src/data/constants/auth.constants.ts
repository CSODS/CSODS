/**
 * TODO: REPLACE WITH ACTUAL CACHE!!!
 * @deprecated
 */
export const ROLES = {
  3: "Guest",
  4: "Student",
  5: "Moderator",
  6: "Administrator",
} as const;

type RoleName = "Guest" | "Student" | "Moderator" | "Administrator";
type RoleDetails = { roleId: number; roleName: RoleName };

type RolesMap = Record<RoleName, RoleDetails>;

export const ROLES_MAP: RolesMap = {
  Guest: { roleId: 3, roleName: "Guest" },
  Student: { roleId: 4, roleName: "Student" },
  Moderator: { roleId: 5, roleName: "Moderator" },
  Administrator: { roleId: 6, roleName: "Administrator" },
} as const;
