// Your code here



// document.addEventListener('DOMContentLoaded', function() {
//     const baseURL = "http://localhost:3000/films";
//     let filmUl = document.getElementById("films");

//     fetch(baseURL)
//     .then(response => response.json()) 
//     .then(data => {
//         data.forEach(film => {
//             let filmLi = document.createElement('li');
//             filmLi.className = "film";

//             let titleEl = document.createElement('span'); 
//             titleEl.textContent = film.title;

//             filmLi.appendChild(titleEl);
//             filmUl.appendChild(filmLi);

//             titleEl.addEventListener("click", () => {
//                 let moviePoster = document.createElement("img");
//                 let position = document.getElementById("posterPosition");
//                 position.innerHTML = "";

//                 moviePoster.src = film.poster;
//                 position.appendChild(moviePoster);

//                 let movieTitle = document.getElementById("title");
//                 movieTitle.textContent = film.title;

//                 let runTime = document.getElementById("runtime");
//                 runTime.textContent = `${film.runtime} minutes`;

//                 let movieDescription = document.getElementById("film-info");
//                 movieDescription.textContent = film.description;

//                 let showTime = document.getElementById("showtime");
//                 showTime.textContent = film.showtime;

//                 let ticket = document.getElementById("ticket-num");
//                 ticket.textContent = film.tickets_sold;

//                 let btn = document.getElementById("buy-ticket");
//                 btn.addEventListener("click", () => {
//                   film.tickets_sold -= 1
//                     ticket.textContent = film.tickets_sold;
                 
//                  checkticket(film)
//                 });
            
                
//             });
//         });
//     });

//     function checkticket(film) {
//         console.log(film)
//         fetch(`${baseURL}/${film.id}`, {
//             method: 'PATCH',
//             headers: {"Content-type": "application/json"},
//             body: JSON.stringify({
//                 tickets_sold: film.tickets_sold
//             })
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
      
//     }

// });


document.addEventListener('DOMContentLoaded', function() {
    const baseURL = "http://localhost:3000/films";
    let filmUl = document.getElementById("films");

    fetch(baseURL)
    .then(response => response.json()) 
    .then(data => {
        data.forEach(film => {
            let filmLi = document.createElement('li');
            filmLi.className = "film";

            let titleEl = document.createElement('span'); 
            titleEl.textContent = film.title;

            filmLi.appendChild(titleEl);
            filmUl.appendChild(filmLi);

            titleEl.addEventListener("click", () => {
                let moviePoster = document.createElement("img");
                let position = document.getElementById("posterPosition");
                position.innerHTML = "";

                moviePoster.src = film.poster;
                position.appendChild(moviePoster);

                let movieTitle = document.getElementById("title");
                movieTitle.textContent = film.title;

                let runTime = document.getElementById("runtime");
                runTime.textContent = `${film.runtime} minutes`;

                let movieDescription = document.getElementById("film-info");
                movieDescription.textContent = film.description;

                let showTime = document.getElementById("showtime");
                showTime.textContent = film.showtime;

                let ticket = document.getElementById("ticket-num");
                ticket.textContent = film.tickets_sold;

                
                let btn = document.getElementById("buy-ticket");
                btn.addEventListener("click", () => {
                    film.tickets_sold -= 1
                    ticket.textContent = film.tickets_sold;
                 
                 checkticket(film)
                        
                });
            });
        });
    });

    // Move the event listener for Buy Ticket button outside fetch and forEach
    let btn = document.getElementById("buy-ticket");
    btn.addEventListener("click", () => {
        // This event listener should be moved inside the click event for the film title
        // It's here just for the sake of completeness, but it's redundant
        
    });

    // Define checkticket function outside fetch and forEach
    function checkticket(film) {
        console.log(film);
        fetch(`${baseURL}/${film.id}`, {
            method: 'PATCH',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                tickets_sold: film.tickets_sold
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
});

