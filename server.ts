// import express, { ErrorRequestHandler } from 'express'
import { print } from "listening-on";
import { createKnex } from "./db";
export const knex = createKnex();
import { RequestLog } from "./types";
import { env } from "./env";
import express, { NextFunction } from "express";
import axios from "axios";
import cheerio from "cheerio";
import { is_admin } from "./middelware";
import expressSession from "express-session";
import { UserController } from "./controllers/user.controller";
import { UserServiceImpl } from "./services/user.service.impl";
import { router } from "./routes/routes";
import { CollectController } from "./controllers/collect.controller";
import { CollectServiceImpl } from "./services/collect.service.impl";
import cors from "cors";

//<-------------------------------------------------------------------->

const app = express();
const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const keyFile = "c29-bad-grp3.json";
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile,
});

//<-------------------------------------------------------------------->

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//<--------------------------March's need------------------------------------>
let userService = new UserServiceImpl(knex);
let collectService = new CollectServiceImpl(knex);

app.use(
  expressSession({
    secret: "gyukj%^&*(*UYTGYHUJYT&*YHIUGYGYI",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    email?: string;
    is_admin?: boolean;
    username?: string;
    user_id: number
  }
}
//<-----------APP.USE---------------------------------------------->

app.use(router);
app.use(new UserController(userService).router);
app.use(new CollectController(collectService).router);


app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.static("books"));
app.use(express.static("public/images"));
app.use(express.static("public"));
app.use(express.static("voice"));
app.use("/admin", is_admin, express.static("private"));

//<--------------------------------------------------------------->

// Convert tp mp3 , save = http://localhost:8080/
// app.get("/textToSpeech", async (req, res) => {
//   const text =
//   "Testing Testing";
//   const request = {
//     input: { text },
//     voice: {
//       languageCode: "yue-HK",
//       ssmlGender: "NEUTRAL",
//       name: "yue-HK-Standard-B",
//     },
//     audioConfig: { audioEncoding: "MP3" },
//   };

//   try {
//     const [response] = await client.synthesizeSpeech(request);
//     const audioContent = response.audioContent;

//     res.set("Content-Type", "audio/mpeg");
//     res.set("Content-Disposition", 'inline; filename="textToSpeech.mp3"');
//     res.send(audioContent);
//   } catch (error) {
//     console.error("Error synthesizing speech:", error);
//     res.status(500).send("Error synthesizing speech");
//   }
// });

//<--------------------------------------------------------------->

app.use((req, res, next) => {
  console.log(req.method, req.url);
  let row: RequestLog = {
    method: req.method,
    url: req.url,
    user_agent: req.headers["user-agent"] || null,
  };
  knex("request_log")
    .insert(row)
    .catch((err) => {
      console.error("failed to insert request_log:", err);
    });
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);


let port = env.PORT;
app.listen(port, async () => {
  print(port);
})


//<--------------------------------------------------------------->

// Convert to mp3 , save = Vscode
async function synthesizeSpeech() {
  const request = {
    input: {
      text: ""},
    voice: {
      languageCode: "yue-HK",
      ssmlGender: "FEMALE",
      name: "yue-HK-Standard-a",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = fs.createWriteStream("public/voice/output.mp3");
  writeFile.write(response.audioContent, "binary");
  writeFile.end();
}

synthesizeSpeech();

//<--------------------------------------------------------------->

// Scraping
async function scrapeHaodoo() {
  try {
    // Make a request to the website
    const response = await axios.get("https://www.haodoo.net/");

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract data based on HTML elements and classes
    const bookTitles: string[] = [];
    $(".a03").each((_, element) => {
      const title = $(element).find("a").text().trim();
      bookTitles.push(title);
    });

    // Display the extracted data
    // console.log("Book Titles:");
    // console.log(bookTitles);
  } catch (error) {
    console.error("Error!!!");
  }
}
