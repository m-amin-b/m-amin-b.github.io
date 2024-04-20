// profile
const publicRepoCount = document.getElementById("public-repo");
const followersCount = document.getElementById("followers");
const followingCount = document.getElementById("following");
// repo
const loader = document.querySelector(".loader");
const repoWrapper = document.getElementById("repo-wrapper");
const message = document.querySelector("#repo-wrapper h2");

// window loaded
window.addEventListener("load", () => {
  // loader.classList.add("hidden");
});

// fetch github Profile
(async function fetchGithubProfile() {
  try {
    const response = await fetch("https://api.github.com/users/m-amin-b");
    if (response.status == 200) {
      const data = await response.json();
      publicRepoCount.innerHTML = data.public_repos;
      followersCount.innerHTML = data.followers;
      followingCount.innerHTML = data.following;
    }
  } catch (err) {}
})();

// fetch github Repo
(async function fetchGithubRepo() {
  try {
    const response = await fetch("https://api.github.com/users/m-amin-b/repos");
    if (response.status == 200) {
      const data = await response.json();
      loader.classList.add("loader-off");
      generateRepoCard(data);
    } else {
      loader.classList.add("loader-off");
      message.innerText = "try to fetch!";
    }
  } catch (err) {
    loader.classList.add("loader-off");
    message.innerText = "check your connection";
  }
})();

// after fetch repos, generate Repos Card
let generateRepoCard = (allData) => {
  repoWrapper.innerHTML = "";
  [...allData].forEach((repo) => {
    // console.log(repo.created_at);

    repoWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="card">

      <!-- title - type -->
      <div class="flex gap-8 justify-between items-center">
          <!-- title -->
          <div class="flex gap-1.5 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M6 19.6231C5.31093 19.4279 4.76772 19.1317 4.31802 18.682C3 17.364 3 15.2426 3 11C3 6.75736 3 4.63604 4.31802 3.31802C5.63604 2 7.75736 2 12 2C16.2426 2 18.364 2 19.682 3.31802C21 4.63604 21 6.75736 21 11C21 15.2426 21 17.364 19.682 18.682C19.2323 19.1317 18.6891 19.4279 18 19.6231" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M12 20.1928C11.5858 20.1928 11.2525 20.5121 10.5858 21.1508C9.93941 21.77 9.61623 22.0796 9.34374 21.9824C9.31027 21.9705 9.27805 21.9548 9.24763 21.9355C9 21.7786 9 21.3111 9 20.3762L9 17.2512C9 15.7186 9 14.9523 9.43934 14.4761C9.87868 14 10.5858 14 12 14C13.4142 14 14.1213 14 14.5607 14.4761C15 14.9523 15 15.7186 15 17.2512V20.3762C15 21.3111 15 21.7786 14.7524 21.9355C14.7219 21.9548 14.6897 21.9705 14.6563 21.9824C14.3838 22.0796 14.0606 21.77 13.4142 21.1508C12.7475 20.5121 12.4142 20.1928 12 20.1928Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 10H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M8 6L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <h2 id="name" class="text-lg">${repo.name}</h2>
          </div>

          <!-- fork - view - type -->
          <div class="grid grid-cols-2 items-center justify-items-end">
              <!-- fork - view -->
              <div class="flex gap-3">
                  <div class="flex gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                          color="#000000" fill="none">
                          <path d="M6 8C7.10457 8 8 7.10457 8 6C8 4.89543 7.10457 4 6 4C4.89543 4 4 4.89543 4 6C4 7.10457 4.89543 8 6 8Z" stroke="currentColor" stroke-width="1.5" />
                          <path d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" stroke="currentColor" stroke-width="1.5" />
                          <path d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z" stroke="currentColor" stroke-width="1.5" />
                          <path d="M6.01734 8.74104C6.01734 10.4146 5.77537 12.1999 9.22051 11.9858H12.0053M17.9929 8.57654C18.1259 11.9858 16.9199 11.7651 15.7861 11.9858H12.0053M12.0053 15.7005V11.9858" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      <span id="forks_count" class="">${repo.forks_count}</span>
                  </div>

                  <div class="flex gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                          color="#000000" fill="none">
                          <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                          <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                      </svg>

                      <span id="watchers_count" class="">${
                        repo.watchers_count
                      }</span>
                  </div>
              </div>
              <span id="visibility" class="bg-[#b195fb] border border-[#b195fb] w-max px-4 py-1.5 rounded-full">${
                repo.visibility
              }</span>
          </div>
      </div>

      ${
        repo.description
          ? `<!-- desc --> <p id="description" class="w-4/5 text-[#918f96] line-clamp-3">${repo.description}</p>`
          : ""
      }
      ${
        repo.topics.length > 0
          ? `<!-- topics -->
        <div class="flex w-full overflow-auto *:shrink-0 gap-1.5" id="topics">
          ${[...repo.topics]
            .map(
              (topic) =>
                `<span class="bg-[#47444f] px-2.5 py-1 rounded-full">${topic}</span>`
            )
            .join("")}
        </div>`
          : ""
      }

      ${
        repo.homepage
          ? `<!-- demo -->
      <div class="flex gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
              <path d="M2.5 9H21.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
              <path d="M13 13L17 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13 17H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.99981 6H7.00879" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M10.9998 6H11.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 9V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <a href="${repo.homepage}" id="homepage"
              class="underline underline-offset-2 text-[#c2a9fc]">Demo</a>
      </div>`
          : ""
      }

      <!-- repo -->
      <div class="flex gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <a href="${
            repo.html_url
          }" id="html_url" class="underline underline-offset-2 text-[#c2a9fc]">Repository On Github</a>
      </div>

      ${
        repo.license
          ? `
                <!-- license -->
                <div class="flex gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000"
                        fill="none">
                        <path
                        d="M12.5294 2C16.5225 2 18.519 2 19.7595 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.7595 20.8284C18.519 22 16.5225 22 12.5294 22H11.4706C7.47751 22 5.48098 22 4.24049 20.8284C3 19.6569 3 17.7712 3 14L3 10C3 6.22876 3 4.34315 4.24049 3.17157C5.48098 2 7.47752 2 11.4706 2L12.5294 2Z"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 7H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 17H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <span id="license" class="text-[#c2a9fc]">${repo.license.name}</span>
                </div>`
          : ``
      }

        <!-- Date -->
        <span class="text-sm text-[#918F96] absolute bottom-4 right-4">${repo.created_at.slice(
          0,
          10
        )}</span>
        
  </div>`
    );
  });
};
