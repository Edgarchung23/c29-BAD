// const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const keyFile = 'c29-bad-grp3.json'; 
const app = express();
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile
});
// GOOGLE_APPLICATION_CREDENTIALS = 'c29-bad-grp3.json';
GOOGLE_APPLICATION_CREDENTIALS = "c29-bad-grp3.json";
// <---------------------------------------------------------------------------------------------------------------->


// <---------------------------------------------------------------------------------------------------------------->
