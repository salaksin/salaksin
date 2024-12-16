// Elements
const reasonDropdown = document.getElementById("reason");
const customReasonContainer = document.getElementById("custom-reason-container");
const submitButton = document.getElementById("submit-btn");
const recipientInput = document.getElementById("recipient");
const customReasonInput = document.getElementById("custom-reason");

// Toggle custom text box based on dropdown selection
reasonDropdown.addEventListener("change", () => {
    if (reasonDropdown.value === "custom") {
        customReasonContainer.style.display = "block";
    } else {
        customReasonContainer.style.display = "none";
    }
});

// Handle form submission
submitButton.addEventListener("click", async () => {
    const recipient = recipientInput.value.trim();
    const reason = reasonDropdown.value;

    if (!recipient || !recipient.includes("@")) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
    }

    let emailBody = "birisi senin salak olduğunu düşünüyor. sebebi ise ";

    // Determine the reason
    if (reason === "beni terk etti") {
        emailBody += "onu terk etmen.";
    } else if (reason === "beni reddetti") {
        emailBody += "onu reddetmen.";
    } else if (reason === "custom") {
        const customText = customReasonInput.value.trim();
        if (!customText) {
            alert("Lütfen bir neden yazın.");
            return;
        }
        emailBody += customText;
    }

    // Send data to backend Worker
    const response = await fetch("https://salaksin-worker.internet-relay-cat.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            recipient: recipient,
            subject: "birisi senin salak olduğunu düşünüyor.",
            content: emailBody,
        }),
    });

    if (response.ok) {
        alert("E-posta başarıyla gönderildi!");
    } else {
        alert("E-posta gönderilirken bir hata oluştu. Tekrar deneyin.");
    }
});
