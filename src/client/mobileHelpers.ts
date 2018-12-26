let isMobile: boolean | null = null;

export function getIsMobile(): boolean {
    if (isMobile === null) {
        isMobile = /mobile/ig.test(navigator.userAgent);
    }

    return isMobile;
}
