async function logout_account(){
  // let target = document.querySelector("logout-button");
  // target.addEventListener("")
  await fetch("/auth/logout");

  window.location.reload();
}


async function getUsername() {
  // 1. fetch call /user/session
  let getUsernameRes = await fetch("/user/session");

  let getUsernameResult;
  
  if (getUsernameRes.status != 200){
    getUsernameResult = await getUsernameRes.json();
    
  }else {
    getUsernameResult = await getUsernameRes.json();
  }

  if(typeof getUsernameResult.data !== 'undefined'){
    document.querySelector('.guestName').innerHTML = "Hello, "+ getUsernameResult.data;
  }

  const loginButton = document.querySelector('.loginButton')
  const logoutButton = document.querySelector('.logout-button')
  if(getUsernameResult.data){
    logoutButton.classList.remove('hidden');
    loginButton.classList.add('hidden')
  } else {
    logoutButton.classList.add('hidden');
    loginButton.classList.remove('hidden')
  }
  // 2. if success => get response data 
  // 3. print the username into html   
}

getUsername()
// // const express = require('express');
// const textToSpeech = require('@google-cloud/text-to-speech');
// const fs = require('fs');
// const keyFile = 'c29-bad-grp3.json'; 
// const app = express();
// const client = new textToSpeech.TextToSpeechClient({
//   keyFilename: keyFile
// });
// // GOOGLE_APPLICATION_CREDENTIALS = 'c29-bad-grp3.json';
// GOOGLE_APPLICATION_CREDENTIALS = "c29-bad-grp3.json";
// // <---------------------------------------------------------------------------------------------------------------->


// // <---------------------------------------------------------------------------------------------------------------->
// // Convert tp mp3 , save = http://localhost:8080/
// app.get('/textToSpeech', async (req, res) => {
//   const text = '聽君一席話如聽一席話';
//   // const text = '逝世後仍繼續席捲全球的傳奇小說家。一九二三年出生於美國維吉尼亞州。美國史上最暢銷的作家之一，擅長以禁斷戀情、血親糾葛等元素創造膾炙人口的小說，征服一代又一代的讀者。雖然中年才邁入寫作生涯，其獨具風格的創作與驚人的銷售成就令同時期作家皆難望其項背，堪稱「歌德羅曼史」、「家族傳奇」類型女王。一九八六年逝世後，由於「V.C.安德魯絲」之名儼然已經成為一個暢銷書品牌，其親族甚至聘請代筆作家，根據她留下的草稿大綱，至今仍繼續發表新作。';
//   const request = {
//     input: { text },
//     voice: { languageCode: 'yue-HK', ssmlGender: 'NEUTRAL', name: "yue-HK-Standard-B" },
//     audioConfig: { audioEncoding: 'MP3' },
//   };

//   try {
//     const [response] = await client.synthesizeSpeech(request);
//     const audioContent = response.audioContent;

//     res.set('Content-Type', 'audio/mpeg');
//     res.set('Content-Disposition', 'attachment; filename="textToSpeech.mp3"');
//     res.send(audioContent);
//   } catch (error) {
//     console.error('Error synthesizing speech:', error);
//     res.status(500).send('Error synthesizing speech');
//   }
// });

// app.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });
