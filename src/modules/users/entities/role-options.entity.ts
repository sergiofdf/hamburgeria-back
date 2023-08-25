export const RoleOptions: { [x: string]: 'USER' | 'OWNER' | 'ADMIN' } = {
  USER: 'USER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
};

export type RoleOptions = (typeof RoleOptions)[keyof typeof RoleOptions];
