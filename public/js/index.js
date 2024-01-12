
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'c29-bad-grp3.json';
const express = require('express');
const app = express();
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const keyFile = 'c29-bad-grp3.json'; 
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile
});
// <---------------------------------------------------------------------------------------------------------------->
// Convert to mp3 , save = Vscode
async function synthesizeSpeech() {
  const request = {
    input: { text: '今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大，他有一分鐘的時間說不出一句話來，大概他也知道對張總經理這種人，懇求他開恩是做不到的，所以他就一言不發地離開了。他走到門口的時候，忽然回過頭來問，今天星期幾？張總經理說星期五，老陳以很嚴肅的口氣說好吧，以後我每個星期五晚上都會來找你。然後他就開門離開了。我也不懂老陳的話什麼意思，可是我注意到我們的張總經理的臉上露出了一恐懼的表情。《閣樓裡的小花》（Petals on the Wind）。小李是他的司機，替他開了六年半的車，他從來沒有和他談過一句閒話，即使兩小時的車程，他也不會和他談一句話。老張是我認識的人之中最有自信的人，這也難怪他，他從小就不知道什麼叫做失敗，大多數高中生功課好的話，體育就奇差，體育好的傢伙卻大多只是四肢發達、頭腦簡單，只有老張，教室裡的考試他不怕，連操場裡的各種考試也都難不倒他。也就因為如此，對於任何表現不好的人，他會打從心裡起有一種厭惡的心理，而且也常將這位倒楣鬼開除掉。兩個月前，老張和我在他辦公室討論一件事，我的一位同學老陳敲門進來，老陳才能中等，可是做事十分認真，' },
    voice: { languageCode: 'yue-HK', ssmlGender: 'MALE', name:'yue-HK-Standard-B' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = fs.createWriteStream('/voice/output.mp3');
  writeFile.write(response.audioContent, 'binary');
  writeFile.end();
}

synthesizeSpeech();

// <---------------------------------------------------------------------------------------------------------------->
// Convert tp mp3 , save = http://localhost:8080/
app.get('/', async (req, res) => {
  const text = '聽君一席話如聽一席話'
//   const text = '逝世後仍繼續席捲全球的傳奇小說家。一九二三年出生於美國維吉尼亞州。美國史上最暢銷的作家之一，擅長以禁斷戀情、血親糾葛等元素創造膾炙人口的小說，征服一代又一代的讀者。雖然中年才邁入寫作生涯，其獨具風格的創作與驚人的銷售成就令同時期作家皆難望其項背，堪稱「歌德羅曼史」、「家族傳奇」類型女王。一九八六年逝世後，由於「V.C.安德魯絲」之名儼然已經成為一個暢銷書品牌，其親族甚至聘請代筆作家，根據她留下的草稿大綱，至今仍繼續發表新作。'
  const request = {
    input: { text },
    voice: { languageCode: 'yue-HK', ssmlGender: 'NEUTRAL', name:"yue-HK-Standard-B" },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;

    res.set('Content-Type', 'audio/mpeg');
    res.send(audioContent);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Error synthesizing speech');
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});