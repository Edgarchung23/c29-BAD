import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

async function jinPingMei (){
    try{
        
        const response = await fetch('https://www.haodoo.net/?M=u&P=P1010490228:0&L=Share&F=-1')

        const body = await response.text();

        const $ = cheerio.load(body)

        const items = []

        $()

    }catch{

    }
}