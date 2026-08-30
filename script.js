// ===============================
// SMART VEHICLE MONITORING SYSTEM
// ===============================

// Default vehicle data
let defaultVehicles = {
    "TN 01 AB 1234": {
        owner: "Praveena",
        type: "Car",
        speed: "85 km/h",
        fuel: "75%"
    },

    "TN 09 XY 5678": {
        owner: "Rahul",
        type: "Bike",
        speed: "60 km/h",
        fuel: "55%"
    },

    "TN 10 CD 9999": {
        owner: "Anitha",
        type: "Bus",
        speed: "45 km/h",
        fuel: "90%"
    },

    "TN 22 ZZ 1111": {
        owner: "Kumar",
        type: "Car",
        speed: "95 km/h",
        fuel: "15%"
    }
};


// Get saved vehicles
let vehicles = JSON.parse(localStorage.getItem("vehicles"));

if (!vehicles) {
    vehicles = defaultVehicles;
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}


// Get search history
let history = JSON.parse(localStorage.getItem("history")) || [];


// Chart variable
let vehicleChart = null;


// ===============================
// SEARCH VEHICLE
// ===============================

function searchVehicle() {

    let input = document.getElementById("vehicleInput");

    if (!input) {
        return;
    }

    let number = input.value.trim();

    if (vehicles[number]) {

        let vehicle = vehicles[number];

        document.getElementById("number").innerHTML = number;
        document.getElementById("owner").innerHTML = vehicle.owner;
        document.getElementById("type").innerHTML = vehicle.type;
        document.getElementById("speed").innerHTML = vehicle.speed;
        document.getElementById("fuel").innerHTML = vehicle.fuel;


        // Fuel percentage
        let fuel = parseInt(vehicle.fuel);

        let fuelFill = document.getElementById("fuelFill");

        if (fuelFill) {

            fuelFill.style.width = fuel + "%";

            if (fuel > 50) {
                fuelFill.style.background = "green";
            }
            else if (fuel > 20) {
                fuelFill.style.background = "orange";
            }
            else {
                fuelFill.style.background = "red";
            }
        }


        // Current time
        let now = new Date();

        let timeElement = document.getElementById("time");

        if (timeElement) {
            timeElement.innerHTML = now.toLocaleString();
        }


        // Vehicle speed status
        let speed = parseInt(vehicle.speed);

        let statusElement = document.getElementById("status");

        if (statusElement) {

            if (speed >= 80) {
                statusElement.innerHTML = "🔴 Overspeed";
            }
            else if (speed >= 40) {
                statusElement.innerHTML = "🟢 Running";
            }
            else {
                statusElement.innerHTML = "🟡 Slow";
            }
        }


        // Warning messages
        let message = "";

        if (speed >= 80) {
            message += "⚠ Overspeed Warning!<br>";
        }

        if (fuel <= 20) {
            message += "⛽ Low Fuel Alert!";
        }


        let messageElement = document.getElementById("message");

        if (messageElement) {
            messageElement.innerHTML = message;
        }


        // Add search history
        history.push(number);

        localStorage.setItem(
            "history",
            JSON.stringify(history)
        );


        showHistory();

    }

    else {

        document.getElementById("number").innerHTML = "Not Found";
        document.getElementById("owner").innerHTML = "-";
        document.getElementById("type").innerHTML = "-";
        document.getElementById("speed").innerHTML = "-";
        document.getElementById("fuel").innerHTML = "-";


        let messageElement = document.getElementById("message");

        if (messageElement) {
            messageElement.innerHTML = "❌ Vehicle Not Found!";
        }
    }
}


// ===============================
// ADD VEHICLE
// ===============================

function addVehicle() {

    let number = document.getElementById("newNumber").value.trim();
    let owner = document.getElementById("newOwner").value.trim();
    let type = document.getElementById("newType").value.trim();
    let speed = document.getElementById("newSpeed").value.trim();
    let fuel = document.getElementById("newFuel").value.trim();


    if (
        number === "" ||
        owner === "" ||
        type === "" ||
        speed === "" ||
        fuel === ""
    ) {

        alert("Please fill all fields!");
        return;
    }


    if (vehicles[number]) {

        alert("Vehicle Number already exists!");
        return;
    }


    vehicles[number] = {

        owner: owner,
        type: type,
        speed: speed,
        fuel: fuel
    };


    localStorage.setItem(
        "vehicles",
        JSON.stringify(vehicles)
    );


    clearForm();

    updateTotalVehicles();
    drawChart();


    alert("Vehicle Added Successfully!");
}


// ===============================
// DELETE VEHICLE
// ===============================

function deleteVehicle() {

    let number = document.getElementById("newNumber").value.trim();


    if (number === "") {

        alert("Enter Vehicle Number!");
        return;
    }


    if (vehicles[number]) {

        delete vehicles[number];

        localStorage.setItem(
            "vehicles",
            JSON.stringify(vehicles)
        );


        clearForm();

        updateTotalVehicles();
        drawChart();

        alert("Vehicle Deleted Successfully!");

    }

    else {

        alert("Vehicle Not Found!");

    }
}


// ===============================
// UPDATE VEHICLE
// ===============================

function updateVehicle() {

    let number = document.getElementById("newNumber").value.trim();


    if (number === "") {

        alert("Enter Vehicle Number!");
        return;
    }


    if (vehicles[number]) {

        vehicles[number].owner =
            document.getElementById("newOwner").value.trim();

        vehicles[number].type =
            document.getElementById("newType").value.trim();

        vehicles[number].speed =
            document.getElementById("newSpeed").value.trim();

        vehicles[number].fuel =
            document.getElementById("newFuel").value.trim();


        localStorage.setItem(
            "vehicles",
            JSON.stringify(vehicles)
        );


        clearForm();

        updateTotalVehicles();
        drawChart();

        alert("Vehicle Updated Successfully!");

    }

    else {

        alert("Vehicle Not Found!");

    }
}


// ===============================
// VIEW VEHICLES
// ===============================

function viewVehicles() {

    let output = `
        <table>
            <tr>
                <th>Vehicle Number</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Speed</th>
                <th>Fuel</th>
            </tr>
    `;


    for (let number in vehicles) {

        output += `
            <tr>
                <td>${number}</td>
                <td>${vehicles[number].owner}</td>
                <td>${vehicles[number].type}</td>
                <td>${vehicles[number].speed}</td>
                <td>${vehicles[number].fuel}</td>
            </tr>
        `;
    }


    output += `
        </table>
    `;


    let list = document.getElementById("vehicleList");

    if (list) {
        list.innerHTML = output;
    }
}


// ===============================
// FILTER VEHICLES
// ===============================

function filterVehicles() {

    let type = document.getElementById("filterType").value;


    let output = `
        <table>
            <tr>
                <th>Vehicle Number</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Speed</th>
                <th>Fuel</th>
            </tr>
    `;


    for (let number in vehicles) {

        if (
            type === "All" ||
            vehicles[number].type === type
        ) {

            output += `
                <tr>
                    <td>${number}</td>
                    <td>${vehicles[number].owner}</td>
                    <td>${vehicles[number].type}</td>
                    <td>${vehicles[number].speed}</td>
                    <td>${vehicles[number].fuel}</td>
                </tr>
            `;
        }
    }


    output += `
        </table>
    `;


    let list = document.getElementById("vehicleList");

    if (list) {
        list.innerHTML = output;
    }
}


// ===============================
// TOTAL VEHICLES
// ===============================

function updateTotalVehicles() {

    let totalElement =
        document.getElementById("totalVehicles");


    if (totalElement) {

        totalElement.innerHTML =
            Object.keys(vehicles).length;
    }


    let totalCount =
        document.getElementById("historyCount");

    if (totalCount) {

        totalCount.innerHTML =
            history.length;
    }
}


// ===============================
// DRAW PIE CHART
// ===============================

function drawChart() {

    let cars = 0;
    let bikes = 0;
    let buses = 0;


    for (let number in vehicles) {

        let type =
            vehicles[number].type.toLowerCase();


        if (type === "car") {
            cars++;
        }

        else if (type === "bike") {
            bikes++;
        }

        else if (type === "bus") {
            buses++;
        }
    }


    let canvas =
        document.getElementById("vehicleChart");


    if (!canvas) {
        return;
    }


    // Destroy old chart
    if (vehicleChart) {

        vehicleChart.destroy();
    }


    vehicleChart = new Chart(canvas, {

        type: "pie",

        data: {

            labels: [
                "Car",
                "Bike",
                "Bus"
            ],

            datasets: [{

                data: [
                    cars,
                    bikes,
                    buses
                ]
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: true
                }
            }
        }
    });
}


// ===============================
// SHOW SEARCH HISTORY
// ===============================

function showHistory() {

    let output = "";


    for (let i = 0; i < history.length; i++) {

        output +=
            "<li>" +
            history[i] +
            "</li>";
    }


    let historyElement =
        document.getElementById("history");


    if (historyElement) {

        historyElement.innerHTML =
            output;
    }


    let historyCount =
        document.getElementById("historyCount");


    if (historyCount) {

        historyCount.innerHTML =
            history.length;
    }
}


// ===============================
// DOWNLOAD CSV
// ===============================

function downloadCSV() {

    let csv =
        "Vehicle Number,Owner,Type,Speed,Fuel\n";


    for (let number in vehicles) {

        csv +=
            number + "," +
            vehicles[number].owner + "," +
            vehicles[number].type + "," +
            vehicles[number].speed + "," +
            vehicles[number].fuel +
            "\n";
    }


    let blob = new Blob(
        [csv],
        {
            type: "text/csv"
        }
    );


    let link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(blob);


    link.download =
        "vehicles.csv";


    link.click();


    URL.revokeObjectURL(
        link.href
    );
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    alert("Logged Out Successfully!");

    window.location.href =
        "login.html";
}


// ===============================
// DARK MODE
// ===============================

function toggleMode() {

    document.body.classList.toggle("dark");
}


// ===============================
// CLEAR FORM
// ===============================

function clearForm() {

    let fields = [

        "newNumber",
        "newOwner",
        "newType",
        "newSpeed",
        "newFuel"

    ];


    fields.forEach(function(id) {

        let element =
            document.getElementById(id);


        if (element) {

            element.value = "";
        }
    });
}


// ===============================
// PAGE LOAD
// ===============================

updateTotalVehicles();

showHistory();

drawChart();