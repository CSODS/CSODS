import { UserDataService } from "../services";
import { AccessTokenPayload } from "../schemas";
import { UserSessionService } from "../services/user-session.service";

declare global {
  namespace Express {
    interface Request {
      userDataService: UserDataService;
      userSessionService: UserSessionService;
      authPayload?: AccessTokenPayload;
    }
  }
}
