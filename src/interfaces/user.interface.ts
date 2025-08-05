//  id String @id @default(uuid())
//  firstname String
//  lastname String
//  email String @unique
//  password String
//  referral_code String @unique
//  referrer_id String?
//  avatar String?
//  description String?
//  login_attempt Int @default(0)
//  login_time_out DateTime?

//  temp_token String?
//  is_verified Boolean @default(false)
//  created_at DateTime @default(now())
//  deleted_at DateTime?
//  edited_at DateTime @updatedAt
//  is_suspended Boolean? @default(false)
//  suspended_cooldown DateTime?

//  role_id String

export interface IUserUpdateParams {
  id: string;
  firstname: string;
  lastname: string;
  description: string;
}

export interface IUpdateUserAvatarParams {
  id: string;
  avatar: Express.Multer.File;
}
