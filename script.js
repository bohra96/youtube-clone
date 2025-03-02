const API_KEY = "AIzaSyAKkoMKIdiQLIlSYQlYEVI1v5PylXohgEU";

const videosList = document.getElementById("videos-list");

const searchVideos = async () => {
  try {
    const query = document.getElementById("yt-search").value.trim();
    if (!query) return; // Don't search if query is empty
    console.log(query);
    videosList.innerHTML =
      '<div class="col-12 text-center"><p>Loading videos...</p></div>';
    // Rest of your code
    const API_URL = `https://youtube.googleapis.com/youtube/v3/search?maxResults=12&type=video&videoDuration=long&q=${query}&key=${API_KEY}`;

    const res = await fetch(API_URL);
    const data = await res.json();

    videosList.innerHTML = "";
    displayVideos(data.items);
  } catch (error) {
    console.log("Error fetching videos", error);
  }
};

const displayVideos = (videos) => {
  videos.forEach((video) => {
    const col = document.createElement("div");
    col.classList.add("col-xl-6", "col-lg-6", "col-sm-12");

    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
    iframe.title = "YouTube video player";
    iframe.frameborder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerpolicy = "strict-origin-when-cross-origin";
    iframe.setAttribute("allowfullscreen", "true");

    col.append(iframe);
    videosList.append(col);
  });
};
