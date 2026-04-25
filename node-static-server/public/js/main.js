// ── Mobile nav toggle ─────────────────────────────────────────────
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ── Contact form (client-side demo) ──────────────────────────────
function submitContact(e) {
  e.preventDefault();
  const name  = document.getElementById('cName')?.value.trim();
  const email = document.getElementById('cEmail')?.value.trim();
  const msg   = document.getElementById('cMsg')?.value.trim();

  if (!name || !email || !msg) return;

  // Show success message (no backend needed for static demo)
  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
}

// ── Highlight active nav link based on current page ───────────────
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
    else link.classList.remove('active');
  });
})();
