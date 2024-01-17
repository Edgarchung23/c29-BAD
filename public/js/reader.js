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

  // Call the async function to start the execution
  init();
