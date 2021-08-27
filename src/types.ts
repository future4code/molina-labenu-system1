export type newClass = {
    name: string,
    type: CLASS_TYPE,
    startDate: string,
    endDate: string,
    module: classModules
}

export enum CLASS_TYPE {
    FULL_TIME = "integral",
    NIGHT = "noturno"
}

export type classModules = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7