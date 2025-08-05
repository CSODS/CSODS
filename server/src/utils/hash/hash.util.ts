import crypto from "crypto";
export class HashService {
  public static simpleHash(str: string): string {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(36); // convert to base36 for compactness
  }

  public static hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  public static hashSessionNumber(userId: number) {
    const rawSessionNumber = `${userId}-${Date.now()}-${Math.random()}`;
    const hashed = crypto
      .createHash("sha256")
      .update(rawSessionNumber)
      .digest("hex");

    return { rawSessionNumber, hashed };
  }

  public static cryptoHash(raw: string) {
    return crypto.createHash("sha256").update(raw).digest("hex");
  }
}
