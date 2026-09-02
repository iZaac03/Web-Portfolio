export const TYPER_SNIPPETS = {
  sql: [
    "SELECT s.student_name, e.grade FROM tbl_enrollments e JOIN tbl_students s ON e.student_id = s.student_id WHERE e.grade >= 3.8 ORDER BY e.grade DESC;",
    "CREATE TABLE tbl_audit_logs (log_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, action VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
  ],
  laravel: [
    "public function authenticate(Request $request) { $credentials = $request->validate(['email' => 'required', 'password' => 'required']); return view('dashboard'); }",
    "Route::middleware(['auth:sanctum'])->group(function () { Route::get('/profile', [UserController::class, 'show']); });"
  ],
  analyst: [
    "Every non-key attribute must provide a fact about the primary key, the whole key, and nothing but the key in Third Normal Form (3NF).",
    "A Data Flow Diagram (DFD) Level 0 context diagram maps the boundary of an information system and its external entity actors."
  ],
  audio: [
    "const osc = audioCtx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.value = 587.33; osc.connect(masterGain); osc.start();",
    "Sweet Child O Mine intro riff plays in D major at 126 BPM with warm valve gain overdrive."
  ]
};
