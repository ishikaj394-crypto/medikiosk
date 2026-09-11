# medikiosk
MediKiosk is a web-based patient and doctor care coordination platform developed using HTML, CSS, and JavaScript and JS.
CSS
:root {
  --bg: #f5f7fb;
  --card: #fff;
  --text: #172033;
  --muted: #6b7280;
  --line: #e6e9f0;

  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --success: #15803d;
  --warning: #b45309;
  --danger: #dc2626;

  --shadow: 0 10px 30px rgba(15, 23, 42, 0.07);
  --radius: 18px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, Segoe UI, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
  border: 0;
}

.topbar {
  height: 72px;
  background: #fff;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  position: sticky;
  top: 0;
  z-index: 5;
}

.logo {
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
}

.logo span {
  color: #111827;
}

.nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav button {
  background: transparent;
  padding: 10px 14px;
  border-radius: 10px;
  color: #4b5563;
}

.nav button:hover {
  background: #f1f5f9;
}

.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 36px 22px;
}

.hero {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 28px;
  align-items: center;
  min-height: 75vh;
}

.hero h1 {
  font-size: 52px;
  line-height: 1.05;
  margin: 12px 0;
}

.hero p {
  font-size: 18px;
  color: var(--muted);
  line-height: 1.7;
  max-width: 650px;
}

.badge {
  display: inline-block;
  padding: 7px 11px;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.role-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.role-card {
  padding: 25px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  text-align: left;
}

.role-card:hover {
  border-color: #93c5fd;
  transform: translateY(-2px);
  transition: 0.2s;
}

.role-icon {
  font-size: 34px;
}

.role-card h3 {
  margin: 12px 0 6px;
}

.role-card p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}

.btn {
  padding: 12px 18px;
  border-radius: 11px;
  font-weight: 700;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: #eef2ff;
  color: #3730a3;
}

.btn-ghost {
  background: #f8fafc;
  color: #374151;
  border: 1px solid var(--line);
}

.btn-danger {
  background: #fee2e2;
  color: #991b1b;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-title h2 {
  margin: 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.two {
  grid-template-columns: 1fr 1fr;
}

.four {
  grid-template-columns: repeat(4, 1fr);
}

.stat {
  padding: 20px;
}

.stat .num {
  font-size: 30px;
  font-weight: 800;
  margin-top: 8px;
}

.muted {
  color: var(--muted);
}

.small {
  font-size: 13px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field.full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 13px;
  font-weight: 700;
  color: #374151;
}

.field input,
.field select,
.field textarea {
  border: 1px solid #d9dee8;
  border-radius: 10px;
  padding: 11px 12px;
  background: #fff;
  outline: none;
}

.field textarea {
  min-height: 105px;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
border-color: #60a5fa;
  box-shadow: 0 0 0 3px #dbeafe;
}

.profile-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #1d4ed8;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px #dbeafe;
}

.profile-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #dbeafe;
  color: #1d4ed8;

Java: 
package com.medikiosk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@SpringBootApplication
@Controller
public class MediKioskApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediKioskApplication.class, args);
    }

    @GetMapping("/")
    public String index() {
        return "index.html"; // Place index.html and style.css in src/main/resources/static/
    }

    @PostMapping("/api/checkin")
    @ResponseBody
    public String handleCheckIn(@RequestParam String fullName, 
                                @RequestParam String dob, 
                                @RequestParam(required = false) String appointmentId) {
        return "Check-in received for " + fullName + " (DOB: " + dob + "). Please proceed to the waiting area.";
    }
}

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

