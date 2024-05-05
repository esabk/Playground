console.log("Guardar datos desde Json en una variable")

const body=document.querySelector('body');
const hUno=document.querySelector('h1');
// Define the URL for the API
const url = 'https://fakestoreapi.com/products/1';
let myData="myData: ESPERANDO RESPUESTA ...";
hUno.textContent = myData;

// Use fetch to make a GET request to the API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Save the API response into a variable
        let apiResponse = data;

        // Process the API response in another function
        hUno.textContent = myData;
        processApiResponse(apiResponse);
    })
    .catch(error => {
        hUno.textContent="myData: NO SE HA TENIDO RESPUESTA !!! INTENTA NUEVAMENTE";
        body.style.backgroundColor="red";
    });

// Define the function to process the API response
function processApiResponse(response) {
    // Do something with the API response
    myData=response;
    hUno.textContent = "RESPUESTA OBTENIDA";
    console.log( myData);
    body.style.backgroundColor="green";
}


