window.addEventListener("load", () => {
  //Variable Declaration
  let lon, lat, img;
  const apiKey = "dfd71de25e1a387f75998cc355c321c0";
  const clock = document.querySelector(".date");
  const cityName = document.querySelector(".city");
  const degreeValue = document.querySelector(".degree__value");
  const weatherIcon = document.querySelector(".weatherIcon");
  const desc = document.querySelector(".description");
  const input = document.querySelector(".search__input");
  const btn = document.querySelector(".btn");
  const cloudyVal = document.querySelector(".cloudy__value");
  const humidityVal = document.querySelector(".humidity__value");
  const speedVal = document.querySelector(".speed__value");
  const pressureVal = document.querySelector(".pressure__value");
  const list = document.getElementsByClassName('row-list')

  //Function Declaration
  async function fetchData() {
    const data = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    return data;
  }

  async function searchFunc() {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`
    );
    return res;
  }
  async function searchExe() {
    const searchdata = await searchFunc();
    const searchReply = searchdata.data;
    const { humidity, pressure, temp } = searchReply.main;
    degreeValue.innerText = Math.floor(temp - 273.15);
    cityName.innerText = `${searchReply.name}, ${searchReply.sys.country}`;
    cloudyVal.innerText = searchReply.weather[0].description
    humidityVal.innerText = humidity
    pressureVal.innerText = pressure
    speedVal.innerText = searchReply.wind.speed
    list[3].remove()
    const newSpan = document.createElement('span')
    const newP = document.createElement('p')
    newSpan.setAttribute('class', 'row-list')
    newSpan.innerText = input.value
    newP.appendChild = newSpan
    
  }

  async function fetchtExe() {
    const resp = await fetchData();
    const reply = resp.data;
    const { humidity, pressure, temp } = reply.main;
    const { description, main, icon } = reply.weather[0];
    cloudyVal.innerText = reply.weather[0].description
    humidityVal.innerText = humidity
    pressureVal.innerText = pressure
    speedVal.innerText = reply.wind.speed

    cityName.innerText = `${reply.name}, ${reply.sys.country}`;
    desc.innerText = description;
    degreeValue.innerText = Math.floor(temp - 273.15);
    img = document.createElement("img");
    img.setAttribute("src", `http://openweathermap.org/img/wn/${icon}.png`);
    weatherIcon.appendChild(img);

    console.log(reply);
    console.log(img);
  }

  function dateFunc() {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let today = new Date();
    let current = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} - ${today.getDate()} ${
      month[today.getMonth()]
    }, ${today.getFullYear()}`;
    return current;
  }

  //Function Execution
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

        setInterval(() => {
          clock.textContent = dateFunc()
      },1000)
      fetchtExe();
      btn.addEventListener("click", searchExe);
    });
  } else {
    alert("Please allow location to get current next time");
  }
});
