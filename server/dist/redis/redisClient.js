var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "redis";
function startRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        const redisClient = createClient({
            url: process.env.REDIS_DATABASE_URL
        });
        redisClient.on("error", function (err) {
            console.log('Redis Client Error');
            throw err;
        });
        yield redisClient.connect();
        return redisClient;
    });
}
export { startRedis };
