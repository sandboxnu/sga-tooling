import { Event, SGATags } from "../util/Types";

export const mockEvents: Event[] = [
  {
    uuid: "1",
    event_name: "Y2K Party",
    start_time: new Date("1999-12-31 20:00:00"),
    end_time: new Date("2000-01-01 00:00:00"),
    sign_in_closed: true,
    location: "Richards 253",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur justo a mi faucibus faucibus. Maecenas pretium efficitur ipsum eget laoreet. Nullam sed convallis turpis, eget mattis tellus. In magna mauris, accumsan eu mauris a, tempus placerat neque. Curabitur quis molestie nibh. Integer ullamcorper nisl id ligula tristique, eu tempor elit mattis. Praesent justo mauris, pulvinar vel feugiat id, lobortis vitae neque.",
    membership_group: [SGATags.ALL_ACTIVE, SGATags.NEW_SENATORS],
  },
  {
    uuid: "2",
    event_name: "Sandbox GM",
    start_time: new Date("2023-01-22 14:00:00"),
    end_time: new Date("2023-01-22 17:00:00"),
    sign_in_closed: true,
    location: "Richards 253",
    description:
      "Duis nec convallis neque. Sed ac urna eget magna pretium gravida. Quisque nec nunc vitae augue tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et felis at ante pretium ornare. Nam quis magna eget nisl tincidunt efficitur quis at enim. Aliquam tempus scelerisque elit, eu laoreet est. Curabitur imperdiet magna sed arcu interdum consequat. Duis hendrerit nibh vel sagittis consectetur. Nulla in nisl neque. Nullam nunc elit, tristique accumsan metus ullamcorper, tristique ultricies ligula.",
    membership_group: [SGATags.NEW_SENATORS],
  },
  {
    uuid: "3",
    event_name: "Christmas Day 2023",
    start_time: new Date("2023-12-25 18:15:23"),
    end_time: new Date("2023-12-25 20:30:54"),
    sign_in_closed: true,
    location: "Afterhours, Curry Student Center",
    description:
      "Praesent eleifend ut velit quis posuere. Aliquam erat volutpat. Praesent eget purus tincidunt, dictum est eget, varius metus. Nunc non tristique turpis. In a nunc sollicitudin sem pulvinar faucibus. Ut rhoncus auctor odio, venenatis fringilla risus pharetra id. Donec ut auctor metus. Phasellus sem libero, eleifend lobortis justo vulputate, laoreet rhoncus ex. Aenean sit amet pulvinar nibh. Pellentesque nec est augue.",
    membership_group: [SGATags.ALL_ACTIVE],
  },
  {
    uuid: "4",
    event_name: "Year-long Fundraiser",
    start_time: new Date("2023-01-01 00:00:00"),
    end_time: new Date("2023-12-31 23:59:59"),
    sign_in_closed: false,
    location: "Snell Quad",
    description:
      "Duis nec convallis neque. Sed ac urna eget magna pretium gravida. Quisque nec nunc vitae augue tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce et felis at ante pretium ornare. Nam quis magna eget nisl tincidunt efficitur quis at enim. Aliquam tempus scelerisque elit, eu laoreet est. Curabitur imperdiet magna sed arcu interdum consequat. Duis hendrerit nibh vel sagittis consectetur. Nulla in nisl neque. Nullam nunc elit, tristique accumsan metus ullamcorper, tristique ultricies.",
    membership_group: [SGATags.NEW_SENATORS, SGATags.ALL_ACTIVE],
  },
  {
    uuid: "5",
    event_name: "Graduation Celebration 2024",
    start_time: new Date("2024-05-15 14:30:00"),
    end_time: new Date("2024-05-15 17:00:00"),
    sign_in_closed: false,
    location: "Richards 253",
    description:
      "Mauris interdum purus massa. Pellentesque eleifend tortor dolor, vitae malesuada elit ullamcorper sed. Morbi ante sapien, convallis et enim eget, elementum semper elit. Aenean a metus sapien. Etiam ac diam id mauris blandit semper sit amet et odio. Curabitur id finibus tortor, sit amet vulputate ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, ex in efficitur lobortis, ligula urna fringilla ex, et placerat odio quam et mauris. Cras tempus vel.",
    membership_group: [SGATags.NEW_SENATORS],
  },
];
