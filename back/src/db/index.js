import mongoose from "mongoose";
import { photoModel } from "./models/photoModel.js";

import dotenv from "dotenv";
dotenv.config();

const errorMsg =
  "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.js 파일을 확인해 주세요.";
const DB_URL = process.env.MONGODB_URL || errorMsg;

if (DB_URL !== process.env.MONGODB_URL) {
  throw new Error(errorMsg);
}

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  ")
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다..." + "\n" + error)
);

export { photoModel };
