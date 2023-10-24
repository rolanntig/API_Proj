//Page1
let slContainer = document.getElementById("slContainer");
let weatherContainer = document.getElementById("weatherContainer");
let nytContainer = document.getElementById("bookContainer");

async function slAPI() {
  let resp = await fetch(
    "https://api.sl.se/api2/realtimedeparturesV4.json?key=07cc8bff96a44efba1219909803abf9e&siteid=7000&timewindow=0"
  );
  let data = await resp.json();

  console.log(data.ResponseData.Buses);
  data.ResponseData.Buses.map((item) => {
    let bussContainer = document.createElement("div");
    bussContainer.style.display = "flex";
    bussContainer.style.justifyContent = "space-between";
    bussContainer.style.marginLeft = "20px";
    bussContainer.style.marginRight = "20px";
    bussContainer.id = "bussContainer";

    let lineNumber = document.createElement("h4");
    lineNumber.textContent = item.LineNumber;
    lineNumber.style.color = "white";
    lineNumber.style.padding = "5px";
    lineNumber.style.borderRadius = "5px";

    let bussName = document.createElement("h4");
    bussName.textContent = item.Destination;

    let arriving = document.createElement("h4");
    arriving.textContent = item.DisplayTime;

    let next = document.createElement("h4");

    if (item.GroupOfLine === "blåbuss") {
      lineNumber.style.backgroundColor = "blue";
    } else {
      lineNumber.style.backgroundColor = "red";
    }

    bussContainer.appendChild(lineNumber);
    bussContainer.appendChild(bussName);
    bussContainer.appendChild(arriving);
    bussContainer.appendChild(next);
    slContainer.appendChild(bussContainer);
  });
}

async function slAPIMetro() {
  let resp = await fetch(
    "https://api.sl.se/api2/realtimedeparturesV4.json?key=07cc8bff96a44efba1219909803abf9e&siteid=7006&timewindow=0"
  );
  let data = await resp.json();

  console.log(data.ResponseData);
  data.ResponseData.Trains.map((item) => {
    let bussContainer = document.createElement("div");
    bussContainer.style.display = "flex";
    bussContainer.style.justifyContent = "space-between";
    bussContainer.style.marginLeft = "20px";
    bussContainer.style.marginRight = "20px";
    bussContainer.id = "bussContainer";

    let lineNumber = document.createElement("h4");
    lineNumber.textContent = item.LineNumber;
    lineNumber.style.color = "white";
    lineNumber.style.padding = "5px";
    lineNumber.style.borderRadius = "5px";

    let bussName = document.createElement("h4");
    bussName.textContent = item.Destination;

    let arriving = document.createElement("h4");
    arriving.textContent = item.DisplayTime;

    if (item.GroupOfLine === "blåbuss") {
      lineNumber.style.backgroundColor = "blue";
    } else {
      lineNumber.style.backgroundColor = "red";
    }

    bussContainer.appendChild(lineNumber);
    bussContainer.appendChild(bussName);
    bussContainer.appendChild(arriving);
    slContainer.appendChild(bussContainer);
  });
}

let WeatherList = [];
async function Weather() {
  let resp = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=huddinge&appid=05abf85529bfdb321b2ca9f97f52d0b8"
  );
  let res = await resp.json();
  let WeatherList = [];
  WeatherList.push(res);
  console.log(WeatherList);
  WeatherList.map((item) => {
    let weatherCont = document.createElement("div");
    let place = document.createElement("h3");
    place.textContent = item.name;
    let wImg = document.createElement("img");
    wImg.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    let degree = document.createElement("h2");
    degree.textContent = Math.ceil(item.main.temp);
    let feels = document.createElement("p");
    feels.textContent = `Feels like ${Math.ceil(item.main.feels_like)}. ${
      item.weather[0].main
    }. ${item.weather[0].description}`;
    let humid = document.createElement("p");
    humid.textContent = `Humidity: ${item.main.humidity} %`;
    let pressure = document.createElement("p");
    pressure.textContent = `Pressure: ${item.main.pressure} hPa`;
    let tempMax = document.createElement("p");
    tempMax.textContent = `Max Temp: ${item.main.temp_max}°`;
    let tempMin = document.createElement("p");
    tempMin.textContent = `Min Temp: ${item.main.temp_min}°`;
    let visibility = document.createElement("p");
    visibility.textContent = `Visibility: ${item.visibility / 1000}km`;
    let dewpoint = document.createElement("p");
    Td = Math.ceil(item.main.temp - (100 - item.main.humidity) / 5);
    dewpoint.textContent = Td + "°";
    let wind = document.createElement("p");
    wind.textContent = `${item.wind.speed} m/s W`;

    weatherCont.appendChild(place);
    weatherCont.appendChild(wImg);
    weatherCont.appendChild(degree);
    weatherCont.appendChild(feels);
    weatherCont.appendChild(humid);
    weatherCont.appendChild(pressure);
    weatherCont.appendChild(tempMax);
    weatherCont.appendChild(tempMin);
    weatherCont.appendChild(visibility);
    weatherCont.appendChild(dewpoint);
    weatherCont.appendChild(wind);
    weatherContainer.appendChild(weatherCont);
  });
}

Weather();

let count = 1;

async function nyTimes() {
  const resp = await fetch(
    "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=stbZR2JlODG1yERGAaor40DGzGAZSyy2"
  );
  const res = await resp.json();

  res.results.map((item) => {
    let nyContainer = document.createElement("div");
    nyContainer.id = "nyContainer";

    let bookCount = document.createElement("h2");
    bookCount.textContent = count;
    count++;

    let nyTitle = document.createElement("h2");
    nyTitle.textContent = item.title;

    let nyAuthor = document.createElement("h4");
    nyAuthor.textContent = item.author;

    nyContainer.appendChild(bookCount);
    nyContainer.appendChild(nyTitle);
    nyContainer.appendChild(nyAuthor);
    nytContainer.appendChild(nyContainer);
  });
}

nyTimes();

async function createCalendar() {
  let link =
    "c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com";
  let resp = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${link}/events?key=AIzaSyDtBVq0Q74q7T9UBnXNMTi6_MXgU_lTfHI&singleEvents=true&orderBy=startTime`
  );

  let data = await resp.json();

  const calendarBody = document.getElementById("calendarContainer");

  // Lista med dagar.
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Loopa igenom varje dag i veckan och skapa händelser för varje dag.
  for (let i = 0; i < 5; i++) {
    const dayCell = document.getElementById(daysOfWeek[i]);

    // Rensa allt i dagens cell.
    dayCell.textContent = "";

    let h1 = document.createElement("h1");
    h1.textContent = daysOfWeek[i];

    dayCell.appendChild(h1);

    // Filtrera händelser för den aktuella dagen.
    const eventsForDay = data.items.filter((event) => {
      const eventDate = new Date(event.start.dateTime);
      return (
        eventDate.toLocaleDateString("en-US", { weekday: "long" }) ===
        daysOfWeek[i]
      );
    });

    // Skapa en lista för att visa händelserna för dagen.
    const eventList = document.createElement("ul");

    // Loopa igenom händelserna och skapa listelement för varje händelse.
    eventsForDay.forEach((event) => {
      const eventItem = document.createElement("li");
      eventItem.innerHTML = `<strong>${event.summary}</strong><br>${event.start.dateTime}`;
      eventList.appendChild(eventItem);
    });

    // Append.
    dayCell.appendChild(eventList);
  }
}
createCalendar();

// calendar id c_classroom69fe1320@group.calendar.google.com
//SL uppslag för att få siteId för slAPI
/*fetch(
  "https://api.sl.se/api2/typeahead.json?key=b9a41bea21f149c791e9d73a9733859d&searchstring=huddinge&stationsonly=True&maxresults10"
)
  .then((json) => json.json())
  .then((res) => console.log(res));

  */
