// Handle form submission
document.getElementById("submitBtn").addEventListener("click", async () => {
    const recipient = document.getElementById("emailBox").value.trim();
    const reason = document.getElementById("reasonDropdown").value;
    const customTextBox = document.getElementById("customReasonBox");
    const customReason = customTextBox ? customTextBox.value.trim() : null;

    if (!recipient || !reason) {
        alert("Lütfen alıcıyı ve sebebi doldurun.");
        return;
    }

    if (reason === "kendim yazacağım" && !customReason) {
        alert("Lütfen kendi sebebinizi yazın.");
        return;
    }

    // Prepare data for the backend
    const requestData = {
        recipient,
        reason,
        custom: reason === "kendim yazacağım" ? customReason : null,
    };

    try {
        const response = await fetch("https://salaksin-worker.internet-relay-cat.workers.dev", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            const result = await response.text();
            alert(result); // Show success message
        } else {
            const error = await response.text();
            alert(`Hata: ${error}`);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
});

// Handle dynamic enabling of the custom reason text box
document.getElementById("reasonDropdown").addEventListener("change", (e) => {
    const customTextBox = document.getElementById("customReasonContainer");
    if (e.target.value === "kendim yazacağım") {
        customTextBox.style.display = "block"; // Show custom reason text box
    } else {
        customTextBox.style.display = "none"; // Hide it
    }
});
