// Include loader for header and footer
class IncludeLoader {
    static async loadIncludes() {
        console.log('Loading includes...');
        
        try {
            await Promise.all([
                this.loadInclude('header', 'includes/header.html'),
                this.loadInclude('footer', 'includes/footer.html')
            ]);
            
            console.log('Includes loaded successfully');
            // After loading includes, initialize other functionality
            this.initializeAfterIncludes();
        } catch (error) {
            console.error('Failed to load includes:', error);
        }
    }
    
    static async loadInclude(elementId, filePath) {
        console.log(`Loading ${elementId} from ${filePath}...`);
        
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
            }
            const content = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = content;
                console.log(`✅ ${elementId} loaded successfully`);
            } else {
                console.error(`❌ Element with ID '${elementId}' not found`);
            }
        } catch (error) {
            console.error(`❌ Error loading ${elementId} from ${filePath}:`, error);
            
            // Check if this is a CORS error (common when opening files directly)
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.warn('⚠️ CORS error detected. This usually happens when opening HTML files directly in browser.');
                console.warn('💡 To fix this, serve the website from a local HTTP server:');
                console.warn('   • Python: python -m http.server 3000');
                console.warn('   • Node.js: npx serve . or npx http-server');
                console.warn('   • VS Code: Use Live Server extension');
            }
            
            // Fallback: Add a placeholder with helpful message
            const element = document.getElementById(elementId);
            if (element) {
                const isCorsError = error.name === 'TypeError' && error.message.includes('fetch');
                element.innerHTML = `<div style="background: ${isCorsError ? '#fff3cd' : '#ffebee'}; color: ${isCorsError ? '#856404' : '#c62828'}; padding: 15px; border: 1px solid ${isCorsError ? '#ffeaa7' : '#ef5350'}; margin: 10px 0; border-radius: 5px;">
                    <strong>${isCorsError ? '⚠️ Server Required' : '❌ Include Load Error'}:</strong> 
                    ${isCorsError ? 
                        `Cannot load ${elementId} when opening files directly in browser.<br>
                        <small>Please run a local server: <code>python -m http.server 3000</code> then visit <code>http://localhost:3000</code></small>` 
                        : 
                        `Failed to load ${filePath}<br><small>Error: ${error.message}</small>`
                    }
                </div>`;
            }
        }
    }
    
    static initializeAfterIncludes() {
        console.log('Initializing after includes...');
        
        // Set active navigation link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log(`Current page detected: ${currentPage}`);
        
        const navLinks = document.querySelectorAll('.nav-link');
        console.log(`Found ${navLinks.length} navigation links`);
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
                console.log(`✅ Set ${href} as active`);
            }
        });
        
        // Re-run translations if the translation system is loaded
        if (window.updateLanguage) {
            const currentLang = document.documentElement.lang || 'cs';
            console.log(`Updating language to: ${currentLang}`);
            window.updateLanguage(currentLang);
        } else {
            console.log('Translation system not yet loaded');
        }
        
        console.log('✅ Initialization complete');
    }
}

// Load includes when DOM is ready
console.log('Include loader script initialized');

if (document.readyState === 'loading') {
    console.log('DOM still loading, adding event listener...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, starting include loading...');
        IncludeLoader.loadIncludes();
    });
} else {
    console.log('DOM already loaded, starting include loading immediately...');
    IncludeLoader.loadIncludes();
}
