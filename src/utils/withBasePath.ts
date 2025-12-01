export function withBasePath(path = ""): string {
    const base = import.meta.env.BASE_URL ?? "/";
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;

    if (!path) {
        return normalizedBase;
    }

    const normalizedPath = path.replace(/^\/+/, "");
    return `${normalizedBase}${normalizedPath}`;
}

