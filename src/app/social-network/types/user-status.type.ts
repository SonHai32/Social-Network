export type UserStatus = {
  state: 'online' | 'offline' | 'away';
  last_change: string;
};
