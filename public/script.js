// Form Submission Handling
document.getElementById("negotiation-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevents page refresh

    const offer = document.getElementById("offer").value;
    const message = document.getElementById("message").value;

    if (!offer || !message) {
        document.getElementById("response").innerText = "Please fill all fields!";
        return;
    }

    try {
        const response = await fetch("/submit-negotiation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ offer, message }),
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("response").innerText = "Offer submitted successfully!";
            document.getElementById("negotiation-form").reset(); // Clear form
        } else {
            document.getElementById("response").innerText = "Submission failed. Try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("response").innerText = "Something went wrong!";
    }
});

// Location Detection on Page Load
window.onload = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Reverse geocoding using OpenStreetMap
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || "Unknown";
            console.log("Detected city:", city);

            const allowedCities = ["Chandigarh", "Mohali"];
            if (!allowedCities.includes(city)) {
                alert(`⚠️ You are currently in ${city}, where our services are not officially available. Are you sure you want to proceed?`);
            }
        })
        .catch(error => {
            console.error("Geocoding error:", error);
        });
}

function errorCallback(error) {
    console.error("Location error:", error.message);
}
