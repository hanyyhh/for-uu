document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("s5ZMjXctAtZxgkNpH");

    const form = document.getElementById("registration-form");
    const submitButton = document.getElementById("submit-button");
    const messageDiv = document.getElementById("message");

    // Program selection functionality
    document.querySelectorAll('.program-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.program-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        // Validate form
        const selectedProgram = document.querySelector('input[name="program"]:checked');
        if (!selectedProgram) {
            showMessage('Please select a program', 'danger');
            return;
        }

        submitButton.classList.add('is-loading');
        
        try {
            // Prepare form data
            const templateParams = {
                first_name: form.firstName.value,
                last_name: form.lastName.value,
                dob: form.dob.value,
                gender: form.querySelector('input[name="gender"]:checked').value,
                email: form.email.value,
                phone: form.phone.value,
                program: selectedProgram.value,
                program_name: selectedProgram.closest('.program-option').querySelector('.program-title').textContent,
                referral_source: form.referralSource.value,
                additional_info: form.additionalInfo.value,
                submission_date: new Date().toLocaleString()
            };

            console.log("Sending email with data:", templateParams); // Debug log

            // Send email
          const response = await emailjs.sendForm(
    "service_peikqch",
    "template_mgqn9s5",
    form, // Pass the form element directly
    "s5ZMjXctAtZxgkNpH" // Your public key
);
            console.log("EmailJS response:", response); // Debug log
            showMessage('Your registration has been submitted successfully!', 'success');
            form.reset();
            document.querySelectorAll('.program-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        } catch (error) {
            console.error("Email sending failed:", error);
            showMessage('Failed to send registration. Please try again later.', 'danger');
        } finally {
            submitButton.classList.remove('is-loading');
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `notification is-${type}`;
        messageDiv.classList.remove('is-hidden');
        if (type === 'success') {
            setTimeout(() => messageDiv.classList.add('is-hidden'), 5000);
        }
    }
});