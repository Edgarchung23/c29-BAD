async function fetchData() {
    try {
      let res = await fetch("/chapter/reader", {
        method: "GET"
      });

      let result = await res.json();

      console.log("fetch data:", result.data);

      // Return the result.data, not the entire result
      return result.data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error; // Re-throw the error to handle it at a higher level
    }
  }
// <--------------------------------------------------------------------------------->

  async function init() {
    try {
      const data = await fetchData();

      const queryString = window.location.search;
      console.log(queryString);
      const urlParams = new URLSearchParams(queryString);
      const book = urlParams.get('book');
      console.log(book);
      document.querySelector(".textTitle").innerHTML = book;



      let bookUrl = `https://c29-bad-grp3.yodaandkeungjai.com/${book}.epub`;
      // let bookUrl = `http://localhost:8100/${book}.epub`;
      let epubReader = ePub(bookUrl);
      var rendition = epubReader.renderTo("reader", { flow: "paginated", width: "700", height: "700", allowScriptedContent: true });
      var displayed = rendition.display();

      var prev = document.getElementById("prev");
      prev.addEventListener("click", function (e) {
        rendition.prev()
        e.preventDefault();
      }, false);

      var next = document.getElementById("next");

      next.addEventListener("click", function (e) {
        console.log(epubReader.package.metadata.direction)
        console.log(rendition)
        rendition.next()
        e.preventDefault();
        console.log("123")
      }, false);

    } catch (e) {
      alert("error 1" + e);
    }
  }
  init();

// <--------------------------------------------------------------------------------->

    async function bookAudio() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookName = urlParams.get('book');
    
    
        if (bookName === '原子習慣') {
          document.querySelector(".voiceContaniner").innerHTML += `
        <audio controls id="voiceControls">
          <source src="../voice/原子習慣Part1.mp3" type="audio/mpeg">
        </audio>
        <audio controls id="voiceControls">
          <source src="../voice/原子習慣Part2.mp3" type="audio/mpeg">
        </audio>
        <audio controls id="voiceControls">
          <source src="../voice/原子習慣Part3.mp3" type="audio/mpeg">
        </audio>`
        } else if (bookName === '蘇菲的世界') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/蘇菲的世界Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/蘇菲的世界Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/蘇菲的世界Part3.mp3" type="audio/mpeg">
          </audio>`
        } else if (bookName === '富爸爸窮爸爸') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/富爸爸窮爸爸part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/富爸爸窮爸爸part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/富爸爸窮爸爸part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特1神秘的魔法石') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特1神秘的魔法石part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特1神秘的魔法石part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特1神秘的魔法石part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特2消失的密室') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特2消失的密室Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特2消失的密室Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特2消失的密室Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特3阿茲卡班的逃犯') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特3阿茲卡班的逃犯Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特3阿茲卡班的逃犯Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特3阿茲卡班的逃犯Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特4火盃的考驗') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特4火盃的考驗Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特4火盃的考驗Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特4火盃的考驗Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特5鳳凰會的密令') {
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特5鳳凰會的密令Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特5鳳凰會的密令Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特5鳳凰會的密令Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特6混血王子的背叛'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特6混血王子的背叛Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特6混血王子的背叛Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特6混血王子的背叛Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '哈利波特7死神的聖物'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特7死神的聖物Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特7死神的聖物Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/哈利波特7死神的聖物Part3.mp3" type="audio/mpeg">
          </audio>`
        }else if (bookName === '安妮日記'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part3.mp3" type="audio/mpeg">
          </audio>`
        }
        else if (bookName === '人性的弱點'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part3.mp3" type="audio/mpeg">
          </audio>`
        }
        else if (bookName === '安妮日記'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part3.mp3" type="audio/mpeg">
          </audio>`
        }
        else if (bookName === '安妮日記'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part3.mp3" type="audio/mpeg">
          </audio>`
        }
      else if (bookName === '安妮日記'){
          document.querySelector(".voiceContaniner").innerHTML += `
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part1.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part2.mp3" type="audio/mpeg">
          </audio>
          <audio controls id="voiceControls">
            <source src="../voice/安妮日記Part3.mp3" type="audio/mpeg">
          </audio>`
        }
      
      
      
bookAudio();
   
