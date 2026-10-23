// Content still waiting on real details is written in [square brackets]; hide it on the site.
export const clean = (s: string | undefined) => (s ?? "").replace(/\[[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim();
export const isReal = (s: string | undefined) => clean(s).length > 0 && !/^[.,:;\s-]*$/.test(clean(s));
