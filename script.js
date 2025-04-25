// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Toggle Dark Mode functionality
    const toggleButton = document.getElementById('toggle-button');
  
    // Ensure the button exists before adding the event listener
    if (toggleButton) {
      // Add a click event listener to toggle dark mode
      toggleButton.addEventListener('click', function () {
        // Toggle the 'dark-mode' class on the body element
        document.body.classList.toggle('dark-mode');
  
        // Optionally, save the dark mode state in localStorage to persist it
        if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('darkMode', 'enabled');
        } else {
          localStorage.setItem('darkMode', 'disabled');
        }
      });
    }
  
    // Check if dark mode was previously enabled and apply the state when the page loads
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  
    // Quote Form Handling
    document.getElementById("quoteForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get form data
      const age = parseInt(document.getElementById("age").value);
      const coverage = parseInt(document.getElementById("coverage").value);
      const type = document.getElementById("type").value;
  
      // Basic input validation
      if (isNaN(age) || isNaN(coverage)) {
          alert("Please enter valid numbers for age and coverage.");
          return; // Prevent submission if validation fails
      }
  
      let baseRate = 0.02;
      if (type === "health") baseRate = 0.015;
      else if (type === "car") baseRate = 0.03;
  
      let ageFactor = age > 50 ? 1.5 : 1.2;
      const quote = (coverage * baseRate * ageFactor).toFixed(2);
  
      document.getElementById("result").textContent = `Estimated Monthly Premium: $${quote}`;
      
      // Reset the form after submission
      this.reset();
    });
  
    // Newsletter Form Handling
    document.getElementById("newsletterForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value;
  
      // Simulate success message
      document.getElementById("newsletterResult").textContent = `Thanks for subscribing, ${email}!`;
  
      // Reset form
      this.reset();
    });
  
    // Contact Form Handling
    function submitContactForm(e) {
      e.preventDefault();
      alert('Thanks for contacting us! We will get back to you soon.');
      e.target.reset();
    }
  
    document.getElementById("contactForm").addEventListener("submit", submitContactForm);
  
  });
  