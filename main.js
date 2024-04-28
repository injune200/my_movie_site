const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTQzOWM4NTIxYjAxODMxYjU4YWI0NDAwZjUxNmU2ZCIsInN1YiI6IjY2MmUzZDUzZTMzZjgzMDEyYjIxOWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ujO3axFmmvqh9poD5Rv4BWxBaU01UwmGuzkNh6cGlbI'
    }
};

// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => {
//         let response_page_length = response["total_pages"];
//         // for (let k =0; k < response_page_length; k++){
//         //     create_card(k);
//         // }
//         create_card(1);

//     })
//     .catch(err => console.error(err));

// function create_card(page_num) {
//     let page_url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page='+page_num;
//     fetch(page_url, options)
//         .then(response => response.json())
//         .then(response => {
//             for (let i = 0; i < response["results"].length; i++) {
//                 let poster_path = response["results"][i]["poster_path"];
//                 let title = response["results"][i]["title"];
//                 let overview = response["results"][i]["overview"];
//                 let vote_average = response["results"][i]["vote_average"];
//                 make_card_code(poster_path, title, overview, vote_average)
//             }
//         })
//         .catch(err => console.error(err));
// }

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i < response["results"].length; i++) {
            let poster_path = response["results"][i]["poster_path"];
            let title = response["results"][i]["title"];
            let overview = response["results"][i]["overview"];
            let vote_average = response["results"][i]["vote_average"];
            make_card_code(poster_path, title, overview, vote_average)
        }
    })
    .catch(err => console.error(err));


function make_card_code(poster_path, title, overview, vote_average) {
    let temp_html = `<div class="col">
    <div class="card h-100">
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${overview}</p>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">${vote_average}</small>
      </div>
    </div>
  </div>`;
    let element = document.getElementById("card_position");
    element.innerHTML += temp_html;
}

