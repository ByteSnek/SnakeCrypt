export class LocalCache {
    constructor(prefix = 'cache_') {
        this.prefix = prefix;
    }
    set(key, value, ttl) {
        const expiresAt = ttl ? Date.now() + ttl * 60 * 1000 : null;
        const entry = { value, expiration: expiresAt };
        localStorage.setItem(this.prefix + key, JSON.stringify(entry));
        return value;
    }
    get(key) {
        const raw = localStorage.getItem(this.prefix + key);
        if (!raw) {
            return null;
        }
        try {
            const entry = JSON.parse(raw);
            if (entry.expiration && Date.now() > entry.expiration) {
                localStorage.removeItem(this.prefix + key);
                return null;
            }
            return entry.value;
        }
        catch (_a) {
            return null;
        }
    }
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }
    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}
export function setNavbar(branding, font) {
    const body = document.body;
    const navbar = document.createElement('nav');
    const navbarInner = document.createElement('div');
    const navbarBrand = document.createElement('a');
    const divider = document.createElement('div');
    navbar.classList.add('navbar');
    navbar.classList.add('navbar-expand-lg');
    navbar.classList.add('dark');
    navbarInner.classList.add('container-fluid');
    navbarInner.classList.add(font);
    navbarBrand.textContent = branding;
    navbarBrand.classList.add('navbar-brand');
    divider.classList.add('divider');
    body.prepend(navbar);
    navbar.after(divider);
    navbar.appendChild(navbarInner);
    navbarInner.appendChild(navbarBrand);
    return navbar;
}
export function setDarkTheme() {
    const body = getBody();
    const classList = body.classList;
    body.setAttribute('data-bs-theme', 'dark');
    classList.add('dark');
}
export function isProduction() {
    const hostname = window.location.hostname;
    const pattern = /\d/;
    return hostname === 'snaker.xyz' || !pattern.test(hostname);
}
export function getCurrentFileName() {
    return window.location.pathname.substring(1).replace('.html', '').toLowerCase();
}
export function getBody() {
    return document.body;
}
export function formatDate(date) {
    const now = new Date();
    const pastDate = new Date(date);
    const yearsDiff = now.getFullYear() - pastDate.getFullYear();
    const monthsDiff = now.getMonth() - pastDate.getMonth() + (12 * yearsDiff);
    if (monthsDiff < 1) {
        return "less than a month ago";
    }
    else if (monthsDiff === 1) {
        return "1 month ago";
    }
    else {
        return `${monthsDiff} months ago`;
    }
}
