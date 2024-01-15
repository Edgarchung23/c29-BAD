const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
import ePub from 'epubjs';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/textToSpeech', async (req: { query: { book: any; }; }, res: { set: (arg0: string, arg1: string) => void; send: (arg0: { new(contextOptions?: AudioContextOptions | undefined): AudioContext; prototype: AudioContext; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
  try {
    const bookFileName = req.query.book; 
    const bookPath = `path/to/${bookFileName}.epub`; 

    const epubReader = ePub(bookPath);
    await epubReader.ready;

    const bookContent = await ePub(bookPath)

    // 將書籍的內容進行文字轉語音處理

    // ...

    // 發送語音檔案到客戶端
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'inline; filename="textToSpeech.mp3"');
    res.send(AudioContext);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Error synthesizing speech');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});