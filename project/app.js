// ─── Sidebar toggle ───────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ─── Storage helpers ──────────────────────────────────────────────
function getUsers() {
  return JSON.parse(localStorage.getItem('eduUsers') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('eduUsers', JSON.stringify(users));
}

// ─── Simulated AJAX POST (XMLHttpRequest) ─────────────────────────
/**
 * Simulates an AJAX POST request.
 * Since there's no real backend, we use JSONPlaceholder as a mock endpoint
 * and persist data to localStorage ourselves.
 */
function ajaxPost(url, data, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError(xhr.status);
      }
    }
  };

  xhr.onerror = function () { onError('Network error'); };
  xhr.send(JSON.stringify(data));
}

// ─── Registration form handler ────────────────────────────────────
const regForm = document.getElementById('regForm');
if (regForm) {
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Bootstrap validation
    if (!regForm.checkValidity()) {
      regForm.classList.add('was-validated');
      return;
    }

    const userData = {
      id: Date.now(),
      name:     document.getElementById('fullName').value.trim(),
      email:    document.getElementById('email').value.trim(),
      phone:    document.getElementById('phone').value.trim(),
      role:     document.getElementById('role').value,
      dept:     document.getElementById('dept').value,
      dob:      document.getElementById('dob').value,
      password: document.getElementById('password').value, // in real apps: hash this
      createdAt: new Date().toLocaleString()
    };

    const toast = document.getElementById('toastMsg');
    const submitBtn = regForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Registering...';

    // AJAX POST to mock API (JSONPlaceholder accepts but doesn't persist)
    ajaxPost('https://jsonplaceholder.typicode.com/users', userData,
      function (response) {
        // Persist to localStorage (our real storage)
        const users = getUsers();
        users.push(userData);
        saveUsers(users);

        toast.style.display = 'block';
        toast.textContent = `✓ ${userData.name} registered successfully! (ID: ${userData.id})`;

        regForm.reset();
        regForm.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa fa-paper-plane me-2"></i>Register User';

        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      },
      function (err) {
        // Fallback: still save locally even if mock API fails
        const users = getUsers();
        users.push(userData);
        saveUsers(users);

        toast.style.background = '#e53e3e';
        toast.style.display = 'block';
        toast.textContent = `⚠ Saved locally (API error: ${err}). User added to local storage.`;

        regForm.reset();
        regForm.classList.remove('was-validated');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa fa-paper-plane me-2"></i>Register User';

        setTimeout(() => { toast.style.display = 'none'; toast.style.background = '#38a169'; }, 5000);
      }
    );
  });
}

// ─── Load & render users table ────────────────────────────────────
function loadUsers() {
  const tbody = document.getElementById('userTableBody');
  if (!tbody) return;

  const users = getUsers();
  const countEl = document.getElementById('userCount');

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">No users registered yet.</td></tr>';
    if (countEl) countEl.textContent = '';
    return;
  }

  tbody.innerHTML = users.map((u, i) => `
    <tr data-id="${u.id}">
      <td>${i + 1}</td>
      <td>${escHtml(u.name)}</td>
      <td>${escHtml(u.email)}</td>
      <td>${escHtml(u.phone)}</td>
      <td>
        <span class="badge-status" style="${roleBadge(u.role)}">${escHtml(u.role)}</span>
      </td>
      <td>${escHtml(u.dept)}</td>
      <td>${escHtml(u.dob)}</td>
      <td style="font-size:0.78rem;color:#718096">${escHtml(u.createdAt)}</td>
      <td>
        <button class="btn-del" onclick="deleteUser(${u.id})">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');

  if (countEl) countEl.textContent = `Showing ${users.length} user(s)`;
}

function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
  loadUsers();
}

// ─── Helpers ──────────────────────────────────────────────────────
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

function roleBadge(role) {
  const map = {
    Student: 'background:#ebf4ff;color:#2b6cb0',
    Faculty: 'background:#f0fff4;color:#276749',
    Admin:   'background:#fff5f5;color:#9b2c2c'
  };
  return map[role] || 'background:#f7f9fc;color:#4a5568';
}
