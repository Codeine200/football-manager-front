export const getLinkClass = (base: string) =>
    ({ isActive }: { isActive: boolean }) =>
        `menu__item ${base} ${isActive ? "menu__item--current" : ""}`;