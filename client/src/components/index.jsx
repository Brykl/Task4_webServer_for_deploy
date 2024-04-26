// Создаем новый объект Date, который содержит текущую дату и время


function getCurrentTime(currentDate) {

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; 
let year = currentDate.getFullYear();


let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();


let readableDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;


return readableDate;
}


export default getCurrentTime;
