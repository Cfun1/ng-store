export class User
{
      id!: number
      username!: string
      password!: string
      avatarUrl?: string
      role?: UserRole

      constructor(userName: string, password: string, avatarUrl?: string, id: number = 0, role: UserRole = UserRole.regular)
      {
            this.id = id;
            this.username = userName;
            this.avatarUrl = avatarUrl;
            this.password = password;
            this.role = role;
      }
}

export enum UserRole
{
      admin,
      regular
}