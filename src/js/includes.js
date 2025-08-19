// Include loader for header and footer
class IncludeLoader {
    static async loadIncludes() {
        try {
            await Promise.all([
                this.loadInclude('header', 'includes/header.html'),
                this.loadInclude('footer', 'includes/footer.html')
            ]);


            this.markActiveNav();

            // Flag + event for other scripts
            window.includesLoaded = true;
            // Delay event dispatch slightly to ensure listeners registered
            setTimeout(() => document.dispatchEvent(new Event('includes:loaded')), 0);
        } catch (e) {
            console.error('Include loading failed:', e);
            window.includesLoaded = false;
        }
    }

    static async loadInclude(elementId, filePath) {
        try {
            const res = await fetch(filePath);
            if (!res.ok) throw new Error(`${filePath} -> ${res.status}`);
            const html = await res.text();
            const mount = document.getElementById(elementId);
            if (mount) mount.innerHTML = html; else console.warn(`Mount #${elementId} missing`);
        } catch (err) {
            const mount = document.getElementById(elementId);
            if (mount) {
                mount.innerHTML = `<div style="padding:12px;border:1px solid #dc2626;color:#dc2626;font-family:serif;">Include '${filePath}' nelze načíst: ${err.message}</div>`;
            }
            console.error('Include error', filePath, err);
        }
    }

    static markActiveNav() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === current);
        });
    }
}

// Kick off include loading on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => IncludeLoader.loadIncludes());
} else {
    IncludeLoader.loadIncludes();
}
