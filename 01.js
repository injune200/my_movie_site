const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTQzOWM4NTIxYjAxODMxYjU4YWI0NDAwZjUxNmU2ZCIsInN1YiI6IjY2MmUzZDUzZTMzZjgzMDEyYjIxOWZhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ujO3axFmmvqh9poD5Rv4BWxBaU01UwmGuzkNh6cGlbI'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        let response_page_length = response["total_pages"];
        let movie_title = [];
        for (let k = 1; k <= response_page_length; k++) {
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page='+k, options)
                .then(response => response.json())
                .then(response => {
                    for(let i=0; i<response["results"].length; i++){
                        movie_title.push(response["results"][i]["title"]);
                    }
                })
                .catch(err => console.error(err));
        }
        console.log(movie_title);
    })
    .catch(err => console.error(err));