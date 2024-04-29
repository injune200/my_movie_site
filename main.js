const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTQzOWM4NTIxYjAxODMxYjU4YWI0NDAwZjUxNmU2ZCIsInN1YiI6IjY2MmUzZDUzZTMzZjgzMDEyYjIxOWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ujO3axFmmvqh9poD5Rv4BWxBaU01UwmGuzkNh6cGlbI'
    }
};

let movie_list = [];
let present_add_movie_id = [];

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        for (let i = 0; i < response["results"].length; i++) {
            let poster_path = response["results"][i]["poster_path"];
            let title = response["results"][i]["title"];
            let overview = response["results"][i]["overview"];
            let vote_average = response["results"][i]["vote_average"];
            let id = response["results"][i]["id"];
            add_movie_list(poster_path, title, overview, vote_average, id)
            make_card_code(poster_path, title, overview, vote_average, id)
        }
    })
    .catch(err => console.error(err));

function add_movie_list(poster_path, title, overview, vote_average, id) { //카드 생성 함수
    movie_list.push({
        "id": id,
        "poster_path": poster_path,
        "title": title,
        "overview": overview,
        "vote_average": vote_average
    });
   
}


function make_card_code(poster_path, title, overview, vote_average, id) { //카드 생성 함수
   
    present_add_movie_id.push(id);

    let temp_html = `<div onclick="print_id(${id})" class="col" id="${id}">
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

function search_enter() {
    let search_name = document.getElementById('search_title').value;

    present_add_movie_id.map((id) => { del(id) })
    present_add_movie_id = [];

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            movie_list.map((num) => {
                if (num["title"] == search_name) {
                    make_card_code(num["poster_path"],num["title"],num["overview"],num["vote_average"],num["id"]);
                }
            })
        })
        .catch(err => console.error(err));
}

function del(id) { //카드 삭제
    const div = document.getElementById(id);
    div.remove();
}

function print_id(id){
    alert("id : "+id);
}
