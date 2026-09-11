try {
const KEY="medikiosk_v2";
const doctors=[
 {id:"d1",name:"Dr. Ananya Sharma",specialization:"General Physician",rating:"4.9/5",experience:"9 years",practice:"City Care Hospital",location:"New Delhi",fee:300},
 {id:"d2",name:"Dr. Rohan Mehta",specialization:"Internal Medicine",rating:"4.8/5",experience:"11 years",practice:"LifePoint Clinic",location:"New Delhi",fee:350},
 {id:"d3",name:"Dr. Kavya Iyer",specialization:"Family Medicine",rating:"4.7/5",experience:"7 years",practice:"Sunrise Multispeciality",location:"New Delhi",fee:250},
 {id:"d4",name:"Dr. Arjun Verma",specialization:"General Physician",rating:"4.6/5",experience:"8 years",practice:"Verma Care Clinic",location:"New Delhi",fee:300},
 {id:"d5",name:"Dr. Meera Kapoor",specialization:"Primary Care",rating:"4.8/5",experience:"10 years",practice:"HealthFirst Hospital",location:"New Delhi",fee:400}
];
function readStore(key, fallback){
  try { const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch(e) { console.warn("MediKiosk storage read failed; starting safely.", e); return fallback; }
}
function writeStore(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch(e) { console.warn("MediKiosk storage write failed.", e); }
}
let db=readStore(KEY,{patients:[],cases:[]});
if(!db || !Array.isArray(db.patients) || !Array.isArray(db.cases)) db={patients:[],cases:[]};
let session=readStore(KEY+"_session",null);
const save=()=>writeStore(KEY,db);
const saveSession=()=>writeStore(KEY+"_session",session);
const app=document.getElementById("app");
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const initials=n=>n.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();
function toast(msg){const x=document.createElement("div");x.className="toast";x.textContent=msg;document.body.appendChild(x);setTimeout(()=>x.remove(),2300)}
function shell(content){
 return `<header class="topbar"><div class="logo">Medi<span>Kiosk</span></div><div class="nav">${session?`<button onclick="go('${session.role==="patient"?"dashboard":"doctorDashboard"}')">Dashboard</button><button onclick="logout()">Logout</button>`:""}</div></header>${content}`;
}
function go(page){({home,patientLogin,doctorLogin,dashboard,profile,newCase,doctorsPage,cases,caseView,doctorDashboard,doctorCase}[page]||home)();window.scrollTo(0,0)}
function home(){
 app.innerHTML=shell(`<main class="container hero"><section><span class="badge">SIH Healthcare Prototype</span><h1>Better intake.<br>Better doctor connection.</h1><p>MediKiosk lets patients save their information once, create new cases when needed, choose a doctor, and track every consultation from one dashboard.</p></section><section class="card"><h2>Continue as</h2><div class="role-grid"><button class="role-card" onclick="go('patientLogin')"><div class="role-icon">👤</div><h3>Patient</h3><p>Access your profile, previous cases and create a new consultation.</p></button><button class="role-card" onclick="go('doctorLogin')"><div class="role-icon">🩺</div><h3>Doctor</h3><p>Review assigned patient reports and respond to cases.</p></button></div></section></main>`);
}
function patientLogin(){
 app.innerHTML=shell(`<main class="container"><div class="card login"><span class="badge">Patient portal</span><h2>Welcome back</h2><p class="muted">Your saved profile and previous cases stay available after login.</p><div class="field"><label>Mobile / Patient ID</label><input id="pid" placeholder="e.g. 9876543210"></div><div style="height:12px"></div><div class="field"><label>Password</label><input id="ppw" type="password" placeholder="Demo password"></div><div style="height:18px"></div><div class="actions"><button class="btn btn-primary" onclick="patientAuth()">Login / Continue</button><button class="btn btn-ghost" onclick="go('home')">← Back</button></div><p class="small muted">For the demo, any non-empty ID and password creates or opens that patient account.</p></div></main>`);
}
function patientAuth(){
 const id=document.getElementById("pid").value.trim(),pw=document.getElementById("ppw").value.trim();if(!id||!pw)return toast("Enter both fields");
 let p=db.patients.find(x=>x.loginId===id);if(!p){p={id:"p_"+Date.now(),loginId:id,password:pw,name:"New Patient",age:"",gender:"",mobile:id,conditions:"",allergies:"",medicines:""};db.patients.push(p);save();toast("Patient profile created")}
 session={role:"patient",patientId:p.id};saveSession();go("dashboard");
}
function doctorsPage(){
  // Kept as a safe navigation target for the existing prototype flow.
  // Doctor identity is now selected securely in the Doctor Login screen.
  doctorLogin();
}
function doctorLogin(){
 app.innerHTML=shell(`<main class="container"><div class="card login"><span class="badge">Doctor portal</span><h2>Doctor Login</h2><p class="muted">Log in as a specific doctor to see only the cases assigned to you.</p><div class="field"><label>Doctor</label><select id="did">${doctors.map(d=>`<option value="${d.id}">${d.name} — ${d.specialization}</option>`).join("")}</select></div><div style="height:12px"></div><div class="field"><label>Password</label><input id="dpw" type="password" placeholder="Enter any demo password"></div><div style="height:18px"></div><div class="actions"><button class="btn btn-primary" onclick="doctorAuth()">Login</button><button class="btn btn-ghost" onclick="go('home')">← Back</button></div><p class="small muted">For the SIH prototype, any non-empty password is accepted. Your selected doctor controls which reports appear.</p></div></main>`);
}
function doctorAuth(){
 const id=document.getElementById("did").value,pw=document.getElementById("dpw").value.trim();
 if(!id||!pw)return toast("Enter a password");
 session={role:"doctor",doctorId:id};saveSession();go("doctorDashboard");
}
function logout(){session=null;saveSession();go("home")}
function dashboard(){
 const p=db.patients.find(x=>x.id===session.patientId),cs=db.cases.filter(x=>x.patientId===p.id).sort((a,b)=>b.createdAt-a.createdAt);
 app.innerHTML=shell(`<main class="container"><div class="profile-head"><div><span class="badge">Patient Dashboard</span><h1>Welcome, ${esc(p.name||"Patient")}</h1><p class="muted">Your information is saved to your patient account. Create a new case without re-entering your profile.</p></div><div class="avatar">${initials(p.name||"Patient")}</div></div><div class="grid four" style="margin:24px 0"><div class="card stat"><div class="muted small">Total cases</div><div class="num">${cs.length}</div></div><div class="card stat"><div class="muted small">Under review</div><div class="num">${cs.filter(c=>c.status==="Under Review").length}</div></div><div class="card stat"><div class="muted small">Responded</div><div class="num">${cs.filter(c=>c.status==="Doctor Responded").length}</div></div><div class="card stat"><div class="muted small">Completed</div><div class="num">${cs.filter(c=>c.status==="Completed").length}</div></div></div><div class="grid two"><div class="card"><div class="section-title"><h2>Patient Profile</h2><button class="btn btn-ghost" onclick="go('profile')">Edit</button></div><p><b>${esc(p.name||"Not set")}</b> · ${esc(p.age||"Age not set")} · ${esc(p.gender||"Gender not set")}</p><p class="muted">📱 ${esc(p.mobile||"Not set")}</p><p class="muted">Medical conditions: ${esc(p.conditions||"None added")}</p><p class="muted">Allergies: ${esc(p.allergies||"None added")}</p></div><div class="card"><h2>Start a new consultation</h2><p class="muted">Your saved identity and medical profile will be reused automatically.</p><button class="btn btn-primary" onclick="go('newCase')">＋ Create New Case</button></div></div><div class="card" style="margin-top:20px"><div class="section-title"><h2>Track Previous Cases</h2><button class="btn btn-secondary" onclick="go('cases')">View all cases</button></div>${cs.slice(0,3).map(caseCard).join("")||`<div class="empty">No cases yet. Your first consultation will appear here.</div>`}</div></main>`);
}
function profile(){
 const p=db.patients.find(x=>x.id===session.patientId);
 app.innerHTML=shell(`<main class="container"><div class="section-title"><div><span class="badge">My Profile</span><h2>Saved patient information</h2></div><button class="btn btn-ghost" onclick="go('dashboard')">Back</button></div><div class="card"><div class="form-grid"><div class="field"><label>Full name</label><input id="name" value="${esc(p.name)}"></div><div class="field"><label>Age</label><input id="age" type="number" value="${esc(p.age)}"></div><div class="field"><label>Gender</label><select id="gender"><option value="">Select</option><option ${p.gender==="Male"?"selected":""}>Male</option><option ${p.gender==="Female"?"selected":""}>Female</option><option ${p.gender==="Other"?"selected":""}>Other</option></select></div><div class="field"><label>Mobile / contact</label><input id="mobile" value="${esc(p.mobile)}"></div><div class="field full"><label>Existing medical conditions</label><textarea id="conditions">${esc(p.conditions)}</textarea></div><div class="field full"><label>Allergies</label><textarea id="allergies">${esc(p.allergies)}</textarea></div><div class="field full"><label>Current medicines</label><textarea id="medicines">${esc(p.medicines)}</textarea></div></div><div style="height:18px"></div><button class="btn btn-primary" onclick="saveProfile()">Save Profile</button></div></main>`);
}
function saveProfile(){
 const p=db.patients.find(x=>x.id===session.patientId);["name","age","gender","mobile","conditions","allergies","medicines"].forEach(k=>p[k]=document.getElementById(k).value.trim());save();toast("Profile saved");go("dashboard");
}
function newCase(){
 const p=db.patients.find(x=>x.id===session.patientId);
 app.innerHTML=shell(`<main class="container"><div class="section-title"><div><span class="badge">New Case</span><h2>Create a consultation case</h2><p class="muted">Saved patient information is already attached to this case.</p></div><button class="btn btn-ghost" onclick="go('dashboard')">Back</button></div><div class="card"><div class="notice">Patient: <b>${esc(p.name||"Profile not completed")}</b> · ${esc(p.age||"Age not set")} · ${esc(p.gender||"Gender not set")} · ${esc(p.mobile||"Contact not set")}</div><div class="form-grid"><div class="field full"><label>Problem description</label><textarea id="problem" placeholder="Describe what you are experiencing"></textarea></div><div class="field"><label>Symptoms</label><textarea id="symptoms" placeholder="List symptoms"></textarea></div><div class="field"><label>Duration</label><input id="duration" placeholder="e.g. 3 days"></div><div class="field"><label>Severity / priority</label><select id="priority"><option>Normal</option><option>Urgent</option></select></div></div><div style="height:20px"></div><h3>Choose a doctor</h3><div class="grid">${doctors.map((d,i)=>`<div class="card doctor" id="doc_${d.id}"><div class="top"><div class="avatar">${initials(d.name)}</div><div><h3>${d.name}</h3><p>${d.specialization}</p><p class="small">⭐ ${d.rating} · ${d.experience}</p></div></div><p class="small">${d.practice} · ${d.location}</p><div class="fee">₹${d.fee} consultation</div><button class="btn btn-primary" onclick="selectDoctor('${d.id}')">Select doctor</button></div>`).join("")}</div><div style="height:18px"></div><button class="btn btn-primary" onclick="submitCase()">Submit Report</button></div></main>`);
}
let selectedDoctor=null;
function selectDoctor(id){selectedDoctor=id;document.querySelectorAll(".doctor").forEach(x=>x.classList.remove("selected"));document.getElementById("doc_"+id).classList.add("selected");toast("Doctor selected")}
function submitCase(){
 if(!selectedDoctor)return toast("Select a doctor first");
 const problem=document.getElementById("problem").value.trim(),symptoms=document.getElementById("symptoms").value.trim(),duration=document.getElementById("duration").value.trim(),priority=document.getElementById("priority").value;
 if(!problem||!symptoms)return toast("Add problem and symptoms");
 const d=doctors.find(x=>x.id===selectedDoctor);
 db.cases.push({id:"CASE-"+String(db.cases.length+1).padStart(3,"0"),patientId:session.patientId,doctorId:d.id,doctorName:d.name,practice:d.practice,problem,symptoms,duration,priority,status:"Under Review",createdAt:Date.now(),response:null,payment:"Pending"});save();selectedDoctor=null;toast("Report submitted to "+d.name);go("cases");
}
function statusClass(s){return s==="Submitted"?"s-submitted":s==="Under Review"?"s-review":s==="Doctor Responded"?"s-responded":"s-completed"}
function caseCard(c){return `<div class="case"><div class="case-head"><div><b>${c.id}</b><div style="margin-top:5px">${esc(c.doctorName)} · ${esc(c.practice)}</div><div class="small muted">${new Date(c.createdAt).toLocaleString()}</div></div><span class="status ${statusClass(c.status)}">${c.status}</span></div><p>${esc(c.problem)}</p><button class="btn btn-ghost" onclick="openCase('${c.id}')">View case & response →</button></div>`}
function cases(){
 const cs=db.cases.filter(x=>x.patientId===session.patientId).sort((a,b)=>b.createdAt-a.createdAt);
 app.innerHTML=shell(`<main class="container"><div class="section-title"><div><span class="badge">Case History</span><h2>Track Previous Cases</h2></div><div class="actions"><button class="btn btn-primary" onclick="go('newCase')">＋ New Case</button><button class="btn btn-ghost" onclick="go('dashboard')">Dashboard</button></div></div><div class="card">${cs.map(caseCard).join("")||`<div class="empty">No previous cases found.</div>`}</div></main>`);
}
function openCase(id){window.currentCase=id;go("caseView")}
function caseView(){
 const c=db.cases.find(x=>x.id===window.currentCase),d=doctors.find(x=>x.id===c.doctorId),p=db.patients.find(x=>x.id===c.patientId);
 const steps=["Submitted","Under Review","Doctor Responded","Completed"],idx=steps.indexOf(c.status);
 app.innerHTML=shell(`<main class="container"><div class="section-title"><div><span class="badge">${c.id}</span><h2>Case details & progress</h2></div><button class="btn btn-ghost" onclick="go('cases')">Back to cases</button></div><div class="card"><div class="progress">${steps.map((s,i)=>`<div class="step ${i<=idx?"done":""}"><div class="step-dot">${i+1}</div>${s}</div>`).join("")}</div><div class="grid two"><div><h3>Patient</h3><p>${esc(p.name)} · ${esc(p.age)} · ${esc(p.gender)}</p><p class="muted">${esc(p.mobile)}</p><p class="muted">Conditions: ${esc(p.conditions||"None")}</p><p class="muted">Allergies: ${esc(p.allergies||"None")}</p><p class="muted">Medicines: ${esc(p.medicines||"None")}</p></div><div><h3>Assigned doctor</h3><p><b>${esc(d.name)}</b> · ${esc(d.specialization)}</p><p class="muted">${esc(d.practice)} · ${esc(d.location)}</p></div></div><hr style="border:0;border-top:1px solid var(--line);margin:22px 0"><h3>Case report</h3><p><b>Problem:</b> ${esc(c.problem)}</p><p><b>Symptoms:</b> ${esc(c.symptoms)}</p><p><b>Duration:</b> ${esc(c.duration)}</p><p><b>Priority:</b> ${esc(c.priority)}</p>${c.response?`<div class="notice"><h3>Doctor response</h3><p>${esc(c.response.text)}</p>${c.response.type==="urgent"?`<p><b>Clinic/Hospital visit:</b> ${esc(c.response.date)} at ${esc(c.response.time)}</p><p>${esc(c.practice)}</p>`:`<p><b>Online consultation fee:</b> ₹${d.fee}</p><p><b>Payment:</b> ${c.payment}</p>${c.payment!=="Paid"?`<button class="btn btn-primary" onclick="payCase('${c.id}')">Simulate Payment</button>`:"<span class='status s-completed'>Payment complete</span>"}`}</div>`:`<div class="empty">Your report is currently with the selected doctor. The response will appear here when the doctor reviews it.</div>`}</div></main>`);
}
function payCase(id){const c=db.cases.find(x=>x.id===id);c.payment="Paid";c.status="Completed";save();toast("Demo payment completed");caseView()}
function doctorDashboard(){
 const doctor=doctors.find(d=>d.id===session.doctorId);
 const cs=db.cases.filter(c=>c.doctorId===session.doctorId).slice().sort((a,b)=>b.createdAt-a.createdAt);
 app.innerHTML=shell(`<main class="container"><span class="badge">Doctor Dashboard</span><div class="section-title"><div><h1>Welcome, ${esc(doctor.name)}</h1><p class="muted">${esc(doctor.specialization)} · ${esc(doctor.practice)} · ${esc(doctor.location)}</p><p class="muted">Only patient reports assigned to you are shown here.</p></div><div class="avatar">${initials(doctor.name)}</div></div><div class="grid four"><div class="card stat"><div class="muted small">My reports</div><div class="num">${cs.length}</div></div><div class="card stat"><div class="muted small">Urgent</div><div class="num">${cs.filter(c=>c.priority==="Urgent").length}</div></div><div class="card stat"><div class="muted small">Under review</div><div class="num">${cs.filter(c=>c.status==="Under Review").length}</div></div><div class="card stat"><div class="muted small">Responded</div><div class="num">${cs.filter(c=>c.status==="Doctor Responded"||c.status==="Completed").length}</div></div></div><div class="card" style="margin-top:20px"><div class="section-title"><h2>My Assigned Cases</h2><span class="small muted">${cs.length} case${cs.length===1?"":"s"}</span></div>${cs.map(c=>{const p=db.patients.find(x=>x.id===c.patientId);return `<div class="case"><div class="case-head"><div><b>${c.id}</b><div>${esc(p?.name||"Patient")}</div><div class="small muted">${new Date(c.createdAt).toLocaleString()}</div></div><span class="status ${statusClass(c.status)}">${c.status}</span></div><p><b>${esc(c.problem)}</b> · ${esc(c.symptoms)}</p><p class="small muted">Priority: ${esc(c.priority)} · Contact: ${esc(p?.mobile||"Not available")}</p><button class="btn btn-primary" onclick="openDoctorCase('${c.id}')">Review report</button></div>`}).join("")||`<div class="empty"><h3>No assigned cases</h3><p>New reports will appear here when patients select ${esc(doctor.name)}.</p></div>`}</div></main>`);
}
function openDoctorCase(id){window.currentCase=id;go("doctorCase")}
function doctorCase(){
 const c=db.cases.find(x=>x.id===window.currentCase);
 if(!c || c.doctorId!==session.doctorId){toast("This case is not assigned to this doctor");go("doctorDashboard");return}
 const p=db.patients.find(x=>x.id===c.patientId),d=doctors.find(x=>x.id===c.doctorId);
 app.innerHTML=shell(`<main class="container"><div class="section-title"><div><span class="badge">${c.id}</span><h2>Patient Report</h2></div><button class="btn btn-ghost" onclick="go('doctorDashboard')">Back</button></div><div class="grid two"><div class="card"><h2>Patient information</h2><p><b>Name:</b> ${esc(p.name)}</p><p><b>Age/Gender:</b> ${esc(p.age)} / ${esc(p.gender)}</p><p><b>Contact:</b> ${esc(p.mobile)}</p><p><b>Existing conditions:</b> ${esc(p.conditions||"None")}</p><p><b>Allergies:</b> ${esc(p.allergies||"None")}</p><p><b>Current medicines:</b> ${esc(p.medicines||"None")}</p></div><div class="card"><h2>Case</h2><p><b>Assigned doctor:</b> ${esc(d.name)}</p><p><b>Practice:</b> ${esc(d.practice)}</p><p><b>Priority:</b> ${esc(c.priority)}</p><p><b>Problem:</b> ${esc(c.problem)}</p><p><b>Symptoms:</b> ${esc(c.symptoms)}</p><p><b>Duration:</b> ${esc(c.duration)}</p></div></div><div class="card" style="margin-top:20px"><h2>Respond to patient</h2><p class="muted">Choose the appropriate prototype response.</p><div class="actions"><button class="btn btn-primary" onclick="urgentResponse('${c.id}')">Urgent — Schedule Visit</button><button class="btn btn-secondary" onclick="normalResponse('${c.id}')">Normal — Online Advice</button></div></div></main>`);
}
function urgentResponse(id){const text=prompt("Enter visit/clinical instructions for the patient:","Please visit the clinic for an in-person assessment.");if(!text)return;const c=db.cases.find(x=>x.id===id);c.response={type:"urgent",text,date:"10 Sept 2026",time:"11:00 AM"};c.status="Doctor Responded";save();toast("Urgent response sent");doctorCase()}
function normalResponse(id){const text=prompt("Enter online advice/treatment guidance:","Please rest, stay hydrated, and follow the recommended online consultation guidance.");if(!text)return;const c=db.cases.find(x=>x.id===id);c.response={type:"normal",text};c.status="Doctor Responded";c.payment="Pending";save();toast("Online advice sent");doctorCase()}
go(session?(session.role==="patient"?"dashboard":"doctorDashboard"):"home");

} catch (error) {
  document.getElementById("app").innerHTML =
    '<div style="font-family:Segoe UI,Arial,sans-serif;padding:40px;max-width:900px;margin:auto">' +
    '<h1 style="color:#dc2626">MediKiosk could not start</h1>' +
    '<p>The prototype caught a JavaScript error instead of showing a blank screen.</p>' +
    '<pre style="background:#111827;color:#fff;padding:18px;border-radius:12px;white-space:pre-wrap">' +
    String(error && (error.stack || error.message) || error).replace(/&/g,"&amp;").replace(/</g,"&lt;") +
    '</pre></div>';
  console.error("MediKiosk startup error:", error);
}
