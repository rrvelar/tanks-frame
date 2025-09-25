// api/index.ts
import app from "../src/app";

// запускаем как Edge Function (поддерживает Fetch API без обёрток)
export const config = { runtime: "edge" };

export default app.fetch;
