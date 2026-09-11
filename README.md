# medikiosk
MediKiosk is a web-based patient and doctor care coordination platform developed using HTML, CSS, and JavaScript.

HTML: 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MediKiosk — Patient Self Check-In</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="kiosk-container">
    
    <!-- Header -->
    <header class="kiosk-header">
      <div class="brand">
        <span class="logo-icon">+</span>
        <h1>MediKiosk</h1>
      </div>
      <div class="system-status">
        <span class="status-dot"></span> System Ready
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="kiosk-card">
      <div class="step-indicator">
        <span class="step active">1. Patient Lookup</span>
        <span class="step">2. Reason for Visit</span>
        <span class="step">3. Confirmation</span>
      </div>

      <div class="kiosk-body">
        <h2>Welcome to HealthCare Clinic</h2>
        <p class="subtitle">Please scan your ID or enter your details below to check in.</p>

        <form action="/api/checkin" method="POST" class="checkin-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="John Doe" required>
            </div>

            <div class="form-group">
              <label for="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" required>
            </div>

            <div class="form-group full-width">
              <label for="appointmentId">Appointment ID / Phone Number</label>
              <input type="text" id="appointmentId" name="appointmentId" placeholder="Enter ID or Phone Number">
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="btn btn-secondary">Clear</button>
            <button type="submit" class="btn btn-primary">Continue Check-In →</button>
          </div>
        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="kiosk-footer">
      <p>Need assistance? Tap <strong>Help</strong> or speak to the front desk staff.</p>
      <button class="btn-help">Call Help Desk</button>
    </footer>

  </div>
</body>
</html>

