/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  // let newmovie = movies.slice(0);
  return movies.map(movie => {
    movie = Object.assign({}, movie);
    let duration = movie.duration.split(" ");
    let minutes = 0;
    // console.log(duration)
    for (let steps in duration) {
      if (duration[steps].indexOf("h") != -1) {
        // console.log(duration[steps])
        minutes += parseInt(duration[steps] = duration[steps].replace("h", "")) * 60;
        // console.log(minutes)
      } else if (duration[steps].indexOf("min") != -1) {
        // console.log(duration[steps])
        minutes += parseInt(duration[steps] = duration[steps].replace("min", ""));
        // console.log(minutes)
      }
    }
    movie.duration = minutes;
    return movie;
  });
}

// Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  const sum = movies.reduce((acc, movie) => {
    let rate = parseFloat(movie.rate);
    if (movie.rate === "") {
      rate = 0;
    }
    return acc + rate;
  }, 0);
  return Math.round(sum / movies.length * 100) / 100;
}

// Get the average of Drama Movies

function dramaMoviesRate(movies) {
  let dramaMovies = movies.filter(movie => {
    for (genre of movie.genre) {
      if (genre === "Drama") {
        return true;
      }
    }
  })
  if (dramaMovies.length === 0) {
    return;
  }
  return ratesAverage(dramaMovies);
}

// Order by time duration, in growing order

function orderByDuration(movies) {
  return movies.sort((a, b) => {
    if (a.duration - b.duration === 0) {
      return a.title > b.title;
    } else {
      return a.duration - b.duration;
    }
  });
}

// How many movies did STEVEN SPIELBERG

function howManyMovies(movies) {
  if (movies.length === 0) {
    return;
  }
  let count = movies.filter(movie => {
    if (movie.director === "Steven Spielberg") {
      for (genre of movie.genre) {
        if (genre === "Drama") {
          return true;
        }
      }
    }
  }).length;
  return `Steven Spielberg directed ${count} drama movies!`
}

// Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  let orderedMovies = movies.sort((a, b) => {
    return a.title > b.title;
  }).slice(0, 20);
  return orderedMovies.map(movie => {
    return movie.title;
  })
}

// Best yearly rate average

function bestYearAvg(movies) {
  if (movies.length === 0) {
    return;
  }

  // Calculate a sorted list of years

  let listOfYears = movies.map(movie => {
    return movie.year;
  }); // list of all years
  listOfYears = Array.from(new Set(listOfYears)); // list of unique years
  listOfYears = listOfYears.sort((a, b) => {
    return a > b;
  }); // list of sorted unique years

  // arrayOfAverageOfYear is an array from objects like
  // [
  //   {
  //     year: $year,
  //     avareadge: $average
  //   },
  //   {
  //     year: $year,
  //     avareadge: $average
  //   }
  // ]
  let arrayOfAverageOfYear = [];

  for (let year of listOfYears) {
    // list of movies of that special year
    let moviesOfYear = movies.filter(movie => {
      return movie.year === year;
    })
    // Calculate the avarege over that list of movies, rounded to 2 digits after comma
    let avaradgeOfYear = Math.round(moviesOfYear.reduce((acc, movie) => {
      if (movie.rate === "") {
        movie.rate = 0;
      }
      return acc + parseFloat(movie.rate);
    }, 0) / moviesOfYear.length * 100) / 100;

    arrayOfAverageOfYear.push({"year": year, "average": avaradgeOfYear});
  }

  // Sort of the new array to use the 1st element of this array as result.

  arrayOfAverageOfYear = arrayOfAverageOfYear.sort((a, b) => {
    if (a.average === b.average) {
      return a.year > b.year;
    }
    return b.average > a.average;
  })

  return `The best year was ${arrayOfAverageOfYear[0].year} with an average rate of ${arrayOfAverageOfYear[0].average}`;
}
