import { Member } from "../util/Types"

export const mockMembers : Member[] = [
    {
        "id": 1,
        "firstName": "Raveesh",
        "lastName": "Mehta",
        "email": "Mehta.R@northeastern.edu",
        "activeMember": false,
        "votingRights": false,
        "receiveNotPresentEmail": false,
        "includeInQuorum": false,
        "signInBlocked": false
    },
    {
        "id": 2,
        "firstName": "Chanmi",
        "lastName": "Oh",
        "email": "Oh.C@northeastern.edu",
        "activeMember": true,
        "votingRights": true,
        "receiveNotPresentEmail": false,
        "includeInQuorum": false,
        "signInBlocked": false
    },
    {
        "id": 3,
        "firstName": "Melody",
        "lastName": "Liu",
        "email": "Liu.M@northeastern.edu",
        "activeMember": true,
        "votingRights": false,
        "receiveNotPresentEmail": true,
        "includeInQuorum": false,
        "signInBlocked": true
    },
    {
        "id": 4,
        "firstName": "Josh",
        "lastName": "Wang",
        "email": "Wang.J@northeastern.edu",
        "activeMember": false,
        "votingRights": false,
        "receiveNotPresentEmail": false,
        "includeInQuorum": true,
        "signInBlocked": false
    },
    {
        "id": 5,
        "firstName": "Dylan",
        "lastName": "Cerenov",
        "email": "Cerenov.D@northeastern.edu",
        "activeMember": false,
        "votingRights": false,
        "receiveNotPresentEmail": true,
        "includeInQuorum": true,
        "signInBlocked": true
    },
    {
        "id": 6,
        "firstName": "Nathan",
        "lastName": "Harvey",
        "email": "Harvey.N@northeastern.edu",
        "activeMember": false,
        "votingRights": false,
        "receiveNotPresentEmail": true,
        "includeInQuorum": false,
        "signInBlocked": false
    },
    {
        "id": 7,
        "firstName": "Suli",
        "lastName": "Rashidzada",
        "email": "Rashidzada.S@northeastern.edu",
        "activeMember": false,
        "votingRights": false,
        "receiveNotPresentEmail": true,
        "includeInQuorum": false,
        "signInBlocked": false
    }
]