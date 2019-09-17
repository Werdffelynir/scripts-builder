
export const len = (n: Array<any>) => String(n).length;

export const random = () => Math.floor((Math.random()) * 100);

export const includeVar2Window = (key: string, object: any) => { if (window) window[key] = object };

