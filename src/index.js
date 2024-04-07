

document.addEventListener('DOMContentLoaded', function() {
    const baseURL = "http://localhost:3000/films";
    let filmUl = document.getElementById("films");

    function checkticket(film) {
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

    function deleteFilm(film){
        fetch(`${baseURL}/${film.id}`,{method:'DELETE'})
        .then(()=>{
            filmUl.removeChild(film.li);
        });
    }

    fetch(baseURL)
    .then(response => response.json()) 
    .then(data => {
        data.forEach(film => {
            let filmLi = document.createElement('li');
            filmLi.className = "film";

            let titleEl = document.createElement('span'); 
            titleEl.textContent = film.title;

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete"
            deleteBtn.id = 'deleteContent'
            titleEl.appendChild(deleteBtn);
            deleteBtn.addEventListener('click',() => {
                titleEl.remove()
                deleteFilm(film)
            })

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
                btn.disabled = film.tickets_sold <= 0; // Disable button if tickets are sold out
                btn.textContent = film.tickets_sold <= 0 ? "Sold Out" : "Buy Ticket";

                btn.addEventListener("click", () => {
                    
                    
                    if (film.tickets_sold > 0) {
                        film.tickets_sold--;
                        ticket.textContent = film.tickets_sold;
                        checkticket(film);
                        btn.disabled = film.tickets_sold <= 0; // Disable button if tickets become sold out
                        btn.textContent = film.tickets_sold <= 0 ? "Sold Out" : "Buy Ticket";
                    }
                    //  Check if tickets are sold out and add/remove sold-out class accordingly
                    if (film.tickets_sold === 0) {
                        btn.textContent = "Sold Out";
                        btn.disabled = true;
                        titleEl.classList.add('sold-out'); // Add class if tickets are sold out
                    } else {
                        btn.textContent = "Buy Ticket";
                        btn.disabled = false;
                        titleEl.classList.remove('sold-out'); // Remove class if tickets are not sold out
                    }
                });
            });
        });
    });
});




