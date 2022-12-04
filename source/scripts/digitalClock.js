setInterval(() =>{
    const time = document.querySelector("#time");
    let date = new Date();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let amPm = "AM";
    let outDay = "Sunday";
    if(day = 1)
    {
        outDay = "Monday ";
    }
    else if(day = 2)
    {
        outDay = "Tuesday ";
    }
    else if(day = 3)
    {
        outDay = "Wednesday ";
    }
    else if(day = 4)
    {
        outDay = "Thursday ";
    }
    else if(day = 5)
    {
        outDay = "Friday ";
    }
    else if(day = 6)
    {
        outDay = "Saturday";
    }

    if(hours >= 12)
    {
        amPm = "PM"
    }
    if(hours > 12)
    {
        hours = hours - 12;
    }
    if(hours < 10)
    {
        hours = "0" + hours;
    }
    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }
    if(seconds < 10)
    {
        seconds = "0" + seconds;
    }
    time.textContent = outDay + hours + ":" + minutes + ":" + seconds + amPm;
});
