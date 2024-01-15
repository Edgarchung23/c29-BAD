const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
import ePub from 'epubjs';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/textToSpeech', async (req, res) => {
  try {
    const bookFileName = req.query.book; // 從查詢參數中獲取書籍檔案名稱
    const bookPath = `path/to/${bookFileName}.epub`; // 書籍檔案的路徑

    const epubReader = ePub(bookPath);
    await epubReader.ready;

    // 獲取書籍的內容
    const bookContent = await epubReader.getBookContent();

    // 將書籍的內容進行文字轉語音處理

    // ...

    // 發送語音檔案到客戶端
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'inline; filename="textToSpeech.mp3"');
    res.send(audioContent);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Error synthesizing speech');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});