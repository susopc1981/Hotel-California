const store = {
  clients: [
    {
      idFamily: 1,
      parent1: { idCard: "32456333C", name: "Carlos Gonzalez", age: 18 },
      adults: [{ idCard: "12345678R", name: "Juan XXIII", age: 28 }],
      children: [
        { idCard: "32456333D", name: "Pablo", age: 7 },
        { idCard: "32456333E", name: "Juan XXIV", age: 12 },
      ],
      tlf: "666555444",
      numRooms: [102],
      checkInDate: "2020/06/07",
    },
    {
      idFamily: 2,
      parent1: { idCard: "32456333F", name: "Andres Montes", age: 18 },
      adults: [],
      children: [
        { idCard: "32456333H", name: "Jorge", age: 2 },
        { idCard: "32456333I", name: "Ana", age: 12 },
      ],
      tlf: "678333121",
      numRooms: [303, 304],
      checkInDate: "2020/06/01",
    },
    {
      idFamily: 3,
      parent1: { idCard: "32456333J", name: "Sofía Martinez", age: 18 },
      adults: [{ idCard: "32456333K", name: "Juana daPaña", age: 28 }],
      children: [{ idCard: "32456333L", name: "Jose", age: 12 }],
      tlf: "655723111",
      numRooms: [101, 103],
      checkInDate: "2020/05/01",
    },
    {
      idFamily: 4,
      parent1: { idCard: "32456333M", name: "Jose Antonio", age: 18 },
      adults: [{ idCard: "32456333N", name: "Pedro Duque", age: 28 }],
      children: [
        { idCard: "32456333O", name: "Javier", age: 7 },
        { idCard: "32456333P", name: "David", age: 12 },
        { idCard: "32456333Q", name: "Andreita", age: 7 },
      ],
      tlf: "981224385",
      numRooms: [201, 202],
      checkInDate: "2020/06/05",
    },
  ],
  rooms: [
    { idRoom: 101, maxCapacity: 1, price: 50, guest: 3 },
    { idRoom: 102, maxCapacity: 4, price: 150, guest: 1 },
    { idRoom: 103, maxCapacity: 2, price: 110, guest: 3 },
    { idRoom: 104, maxCapacity: 2, price: 100, guest: "" },
    { idRoom: 201, maxCapacity: 2, price: 150, guest: 4 },
    { idRoom: 202, maxCapacity: 3, price: 200, guest: 4 },
    { idRoom: 301, maxCapacity: 1, price: 50, guest: "" },
    { idRoom: 302, maxCapacity: 4, price: 150, guest: "" },
    { idRoom: 303, maxCapacity: 2, price: 110, guest: 2 },
    { idRoom: 304, maxCapacity: 2, price: 100, guest: 2 },
    { idRoom: 401, maxCapacity: 2, price: 150, guest: "" },
    { idRoom: 402, maxCapacity: 3, price: 200, guest: "" },
  ],
};

export { store };
