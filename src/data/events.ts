import { Event } from "../util/Types";

export const mockEvents : Event[] = [
    {
        "id": 1,
        "eventName": "Y2K Party",
        "startTime": new Date("1999-12-31 20:00:00"),
        "endTime": new Date("2000-01-01 00:00:00"),
        "signInClosed": true,
        "tags": ["Senate", "Committee", "Guest Speaker"]
    },
    {
        "id": 2,
        "eventName": "Sandbox GM",
        "startTime": new Date("2022-01-22 14:00:00"),
        "endTime": new Date("2023-01-22 17:00:00"),
        "signInClosed": true,
        "tags": ["Guest Speaker"]
    },
    {
        "id": 3,
        "eventName": "Christmas Day 2023",
        "startTime": new Date("2023-12-25 18:15:23"),
        "endTime": new Date("2023-12-25 20:30:54"),
        "signInClosed": true,
        "tags": ["Senate", "Committee", "Guest Speaker"]
    },
    {
        "id": 4,
        "eventName": "Last Day of Classes 2024",
        "startTime": new Date("2024-05-15 00:00:00"),
        "endTime": new Date("2024-05-15 23:59:59"),
        "signInClosed": false,
        "tags": ["Senate", "Guest Speaker"]
    },
    {
        "id": 5,
        "eventName": "Graduation Celebration 2024",
        "startTime": new Date("2024-05-15 14:30:00"),
        "endTime": new Date("2024-05-15 17:00:00"),
        "signInClosed": false,
        "tags": ["Senate", "Guest Speaker"]
    }
]

