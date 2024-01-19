const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const keyFile = "c29-bad-grp3.json";

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile,
});

async function synthesizeSpeech() {
  const request = {
    input: {
      text: "",
    },
    voice: {
      languageCode: "yue-HK",
      ssmlGender: "MALE",
      name: "yue-HK-Standard-d",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = fs.createWriteStream("public/voice/output.mp3");
  writeFile.write(response.audioContent, "binary");
  writeFile.end();
}

synthesizeSpeech();
