export interface DayWiseTags {
    subject: string,
    tag: string
}
export interface trackData {
    date: Date,
    tag: 'string',
    subject: string,
    done: boolean,
    cancelled: boolean
}
export interface daysNotToIncludeSchema {
    date: Date,
    include: boolean
}

export interface Setting {
    id: string,
    startDate: Date,
    endDate: Date,
    tags: string[],
    index: Number,
    monday: [DayWiseTags]
    tuesday: [DayWiseTags]
    wednesday: [DayWiseTags]
    thursday: [DayWiseTags]
    friday: [DayWiseTags]
    saturday: [DayWiseTags]
    sunday: [DayWiseTags]
    track: [trackData],
    daysNotToInclude: [daysNotToIncludeSchema]
    [key: string]: any;
}
