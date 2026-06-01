import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../../.env") });

async function main(): Promise<void> {
  const mongoose = (await import("mongoose")).default;
  const Question = (await import("../models/Question.js")).default;
  const { staticQuestions } = await import("./staticQuestions.js");

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set in backend/.env");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected for seeding.");

  const existing = await Question.countDocuments();
  if (existing > 0) {
    console.log(`Clearing ${existing} existing questions…`);
    await Question.deleteMany({});
  }

  console.log(`Inserting ${staticQuestions.length} static questions…`);
  await Question.insertMany(staticQuestions);

  const total = await Question.countDocuments();
  console.log(`Seed complete. Total questions in DB: ${total}`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (error) => {
  console.error("Seed script failed:", error);
  const mongoose = (await import("mongoose")).default;
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
