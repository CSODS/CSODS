import { CookieOptions } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

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

export type TokenType = "access" | "refresh";
type CookieConfig = {
  cookieName: string;
  clearCookie: CookieOptions;
  persistentCookie: CookieOptions;
  sessionCookie: CookieOptions;
};
type TokenConfig = {
  secret: string | undefined;
  signOptions: jwt.SignOptions;
  cookieConfig?: CookieConfig;
};
type TokenConfigRecord = Record<TokenType, TokenConfig>;

/**
 * @constant tokenConfigRecord
 * @description A {@link TokenConfigRecord} object containing config details about different
 * token types. It's key is of type {@link TokenType}.
 */
export const TOKEN_CONFIG_RECORD: TokenConfigRecord = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: "5m",
    } as jwt.SignOptions,
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    signOptions: {
      expiresIn: "30d",
    } as jwt.SignOptions,
    cookieConfig: {
      cookieName: "refresh_token",
      clearCookie: {
        httpOnly: true,
        sameSite: "none",
        secure: true, // *change to true in production/when not using thunderclient
      },
      persistentCookie: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
      sessionCookie: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
  },
} as const;
