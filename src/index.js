// Grabbing all the necessary tags
const uList =document.querySelector('#films');
const imageAdd = document.getElementById('poster');
const title = document.querySelector('#title');
const runtime = document.getElementById('runtime');
const movieInfo = document.getElementById('film-info')
const spanTime = document.querySelector('#showtime');
const ticketNum = document.getElementById('ticket-num')
const buyTicket = document.getElementById('buy-ticket')

//Make a fetch request to our local server to add movie when page loads
const urlDestination = 'http://localhost:3000/films'

function fetchDisplayMovieTitles(id) {
  fetch(`${urlDestination}/${id}`)
  .then(resp => resp.json())
  .then(data => {
    imageAdd.src = data.poster;
    title.innerHTML = data.title;
    runtime.innerHTML = data.runtime;
    movieInfo.innerHTML = data.description;
    spanTime.innerHTML = data.showtime;
    ticketNum.innerHTML = data.capacity - data.tickets_sold;
    

  })
}
//Adding movie titles to the list elements
function fetchMovieTitle() {
  fetch(`${urlDestination}`)
  .then(resp => resp.json())
  .then(data => {
    uList.replaceChildren()
    data.forEach(movies => {
      const movieList = document.createElement('li')
      movieList.classList = "film item"
      movieList.innerHTML = movies.title.toUpperCase();
      movieList.addEventListener('click', (e) =>{
        console.log(e);
        fetchDisplayMovieTitles(movies.id);
      });
      movieList.addEventListener('mouseover', (e) =>{
        console.log(e)

      })
      uList.appendChild(movieList);
    });
  })
}
//Click event for our buy tickets button
function buyMovieTickets() {
  buyTicket.addEventListener('click', (e) => {
      let count = parseInt(ticketNum.textContent.split(""));
     if(count > 1){
      ticketNum.textContent = `${count - 1}`
    } else {
      ticketNum.innerHTML = ''
      ticketNum.textContent = "SOLD OUT";
      ticketNum.style.color = "red"
    }
    })
  
}
//Putting all our functions together when our DOM loads
document.addEventListener("DOMContentLoaded", () => {
  fetchDisplayMovieTitles(1);
  fetchMovieTitle();
  buyMovieTickets();

})
