import { UserDataService } from "@/services";
import { TokenPayload } from "../schemas";

declare global {
  namespace Express {
    interface Request {
      userDataService: UserDataService;
      authPayload?: TokenPayload;
    }
  }
}
