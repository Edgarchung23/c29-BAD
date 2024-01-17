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
app.get("/textToSpeech", async (req, res) => {
  const text =
  "Testing Testing";
  const request = {
    input: { text },
    voice: {
      languageCode: "yue-HK",
      ssmlGender: "NEUTRAL",
      name: "yue-HK-Standard-B",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;

    res.set("Content-Type", "audio/mpeg");
    res.set("Content-Disposition", 'inline; filename="textToSpeech.mp3"');
    res.send(audioContent);
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    res.status(500).send("Error synthesizing speech");
  }
});

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
      text: "蘇菲的世界簡介這是一本關於哲學史的小說。20世紀百部經典著作之一。1994年獲德國青少年文學獎與最優秀作品獎《蘇菲的世界(Sophie's world)》以小說的形式，通過一名哲學導師向一個叫蘇菲的女孩傳授哲學知識的經過，揭示了西方哲學史發展的歷程。由前蘇格拉底時代到薩特，以及亞里士多德、笛卡兒、黑格爾、祁克國、柏拉圖等人的思想都通過作者生動的筆觸躍然紙上，並配以當時的歷史背景加以解釋，引人入勝。評論家認為，對於那些從未讀過哲學課程的人而言此書是最為合適的入門書，而對於那些以往讀過一些哲學而已忘得一乾二淨的人士，也可起到溫故知新的作用。該書自1991年出版發行之後，長期雄踞各國暢銷書排行榜第一名，世界上已有35個國家購買了該書的版權。截止到1995年5月，該書德文版的銷售已達120萬冊的天文數字。一部《蘇菲的世界》就是一部深入淺出的人類哲學史。它不僅能喚醒人們內心深處對生命的敬仰與讚歎、對人生意義的關心與好奇，而且也為每一個人的成長——使生命從混沌走向智慧、由困惑而進入覺悟之境，掛起了一盞盞明亮的桅燈伊甸園在某個時刻事物必然從無到有……蘇菲放學回家了。有一段路她和喬安同行，她們談著有關機器人的問題。喬安認為人的腦子就像一部很先進的電腦，這點蘇菲並不太贊同。她想：人應該不只是一臺機器吧？她們走到超市那兒就分手了。蘇菲住在市郊，那一帶面積遼闊，花木扶疏。蘇菲家位於外圍，走到學校的距離是喬安家的一倍，附近除了她家的園子之外，沒有其他住家，因此看起來她們彷彿住在世界盡頭似的。再過去，就是森林了。蘇菲轉了個彎，走到苜蓿巷路上。路盡頭有一個急轉彎，人們稱之為“船長彎”。除了週六、週日的時候，人們很少打這兒經過。正是五月初的時節。有些人家的園子裡，水仙花已經一叢叢開滿了果樹的四周，赤楊樹也已經長出了嫩綠的葉子。每年到這個時節，萬物總是充滿了生機。這豈不是一件奇妙的事嗎？當天氣變暖，積雪融盡時，千千萬萬的花草樹木便陡地自荒枯的大地上生長起來了。這是什麼力量造成的呢？蘇菲打開花園的門時，看了看信箱。裡面通常有許多垃圾郵件和一些寫給她媽媽的大信封。她總是把它們堆在廚房的桌子上，然後走上樓到房間做功課。偶爾，也會有一些銀行寄給她爸爸的信。不過，蘇菲的爸爸跟別人不太一樣。他是一艘大油輪的船長，幾乎一年到頭都在外面。難得有幾個星期在家時，他會上上下下細心打點，為蘇菲母女倆把房子整理得漂亮舒適。不過，當他出海後卻顯得離她們遙遠無比。今天，信箱裡卻只有一封信，而且是寫給蘇菲的。信封上寫著：“苜蓿路三號，蘇菲收”。只此而已，沒有寫寄信人的名字，也沒貼郵票。蘇菲隨手把門帶上後，便拆開了信封。"},
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
