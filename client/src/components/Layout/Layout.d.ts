export interface DayWiseTags {
    subject: string,
    tag: string
}

export interface Layout {
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
    [key: string]: any;
}
