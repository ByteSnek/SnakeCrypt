type CacheEntry<T> = 
{
    value: T;
    expiration: number | null;
};

export class LocalCache
{
    private readonly prefix: string;

    public constructor(prefix = 'cache_')
    {
        this.prefix = prefix;
    }

    public set<T>(key: string, value: T, ttl?: number): T
    {
        const expiresAt: number | null = ttl ? Date.now() + ttl * 60 * 1000 : null;
        const entry: CacheEntry<T> = { value, expiration: expiresAt };

        localStorage.setItem(this.prefix + key, JSON.stringify(entry));

        return value;
    }

    public get<T>(key: string): T | null
    {
        const raw: string | null = localStorage.getItem(this.prefix + key);

        if (!raw) 
        {
            return null;
        }

        try {
            const entry: CacheEntry<T> = JSON.parse(raw);

            if (entry.expiration && Date.now() > entry.expiration) 
            {
                localStorage.removeItem(this.prefix + key);

                return null;
            }

            return entry.value;
        } catch {
            return null;
        }
    }

    public remove(key: string): void
    {
        localStorage.removeItem(this.prefix + key);
    }

    public clear(): void
    {
        Object.keys(localStorage).forEach(key =>
        {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

export function setNavbar(branding: string, font: string): HTMLElement 
{
    const body: HTMLElement = document.body;
    const navbar: HTMLElement = document.createElement('nav');
    const navbarInner: HTMLDivElement = document.createElement('div');
    const navbarBrand: HTMLAnchorElement = document.createElement('a');
    const divider: HTMLDivElement = document.createElement('div');

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

export function setDarkTheme() 
{
    const body: HTMLElement = getBody();
    const classList: DOMTokenList = body.classList;

    body.setAttribute('data-bs-theme', 'dark');
    classList.add('dark');
}

export function isProduction(): boolean
{
    const hostname: string = window.location.hostname;
    const pattern: RegExp = /\d/;

    return hostname === 'snaker.xyz' || !pattern.test(hostname);
}

export function getCurrentFileName(): string
{
    return window.location.pathname.substring(1).replace('.html', '').toLowerCase();
}

export function getBody(): HTMLElement 
{
    return document.body;
}

export function formatDate(date: Date): string
{
    const now: Date = new Date();
    const pastDate: Date = new Date(date);

    const yearsDiff: number = now.getFullYear() - pastDate.getFullYear();
    const monthsDiff: number = now.getMonth() - pastDate.getMonth() + (12 * yearsDiff);

    if (monthsDiff < 1) {
        return "less than a month ago";
    } else if (monthsDiff === 1) {
        return "1 month ago";
    } else {
        return `${monthsDiff} months ago`;
    }
}