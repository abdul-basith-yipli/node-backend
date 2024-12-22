export const rolePermissions: Record<string, string[]> = {
  user: ["read:user", "update:user"],
  admin: ["list:user", "read:user", "update:user", "delete:user"],
  superAdmin: [],
};
