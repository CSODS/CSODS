import { UserDataService } from "../services";
import { AccessTokenPayload } from "../schemas";

declare global {
  namespace Express {
    interface Request {
      userDataService: UserDataService;
      authPayload?: AccessTokenPayload;
    }
  }
}
