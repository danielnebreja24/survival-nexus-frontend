const mockAverageItemsResponse = [
  { resource: "Survivor 1", average: 10 },
  { resource: "Survivor 2", average: 20 },
];

const mockSurvivorData = [
  {
    id: 4,
    name: "Gean Lyka Dasal",
    age: 27,
    gender: "Female",
    infected: false,
    lastLocation: {
      latitude: -19.2763,
      longitude: 90.7678,
    },
    inventory: [
      {
        id: 18,
        survivorId: 4,
        itemId: 8,
        quantity: 40,
        item: {
          id: 8,
          name: "Protein Juice",
          description: "Protein juice for gymrat survivors",
        },
      },
      {
        id: 20,
        survivorId: 4,
        itemId: 11,
        quantity: 1,
        item: {
          id: 11,
          name: "Some Item",
          description: "Description of some item",
        },
      },
      {
        id: 22,
        survivorId: 4,
        itemId: 6,
        quantity: 1,
        item: {
          id: 6,
          name: "Another Item",
          description: "Description of another item",
        },
      },
      {
        id: 24,
        survivorId: 4,
        itemId: 2,
        quantity: 1,
        item: {
          id: 2,
          name: "Third Item",
          description: "Description of third item",
        },
      },
    ],
  },
  {
    id: 9,
    name: "Lyka Dagul",
    age: 23,
    gender: "Female",
    infected: false,
    lastLocation: {
      latitude: -19.234,
      longitude: 92.3452,
    },
    inventory: [
      {
        id: 5,
        survivorId: 9,
        itemId: 6,
        quantity: 1,
        item: {
          id: 6,
          name: "Medicine Kit",
          description: "A box of assorted medicines",
        },
      },
      {
        id: 13,
        survivorId: 9,
        itemId: 2,
        quantity: 1,
        item: {
          id: 2,
          name: "Sniper",
          description: "A sniper",
        },
      },
      {
        id: 21,
        survivorId: 9,
        itemId: 11,
        quantity: 1,
        item: {
          id: 11,
          name: "Some Other Item",
          description: "Description of some other item",
        },
      },
    ],
  },
];

const itemsList = [
  {
    id: 8,
    name: "Protein Juice",
    description: "Protein juice for gymrat survivors",
  },
  {
    id: 11,
    name: "Some Item",
    description: "Description of some item",
  },
  {
    id: 6,
    name: "Another Item",
    description: "Description of another item",
  },
  {
    id: 2,
    name: "Third Item",
    description: "Description of third item",
  },
  {
    id: 6,
    name: "Medicine Kit",
    description: "A box of assorted medicines",
  },
  {
    id: 2,
    name: "Sniper",
    description: "A sniper",
  },
  {
    id: 11,
    name: "Some Other Item",
    description: "Description of some other item",
  },
];

const survivorWithItems = [
  {
    id: 4,
    name: "Gean Lyka Dasal",
    items: [
      { id: 8, quantity: 40, name: "Protein Juice" },
      { id: 11, quantity: 1, name: "Some Item" },
      { id: 6, quantity: 1, name: "Another Item" },
      { id: 2, quantity: 1, name: "Third Item" },
    ],
  },
  {
    id: 9,
    name: "Lyka Dagul",
    items: [
      { id: 6, quantity: 1, name: "Medicine Kit" },
      { id: 2, quantity: 1, name: "Sniper" },
      { id: 11, quantity: 1, name: "Some Other Item" },
    ],
  },
];

export const mockData = {
  mode: "light",
  openDrawer: false,
  currentPage: "Dashboard",
  survivorList: mockSurvivorData,
  itemsList: itemsList,
  survivorWithItems: survivorWithItems,
  fetchAverageItemPerSurvivor: jest
    .fn()
    .mockResolvedValue(mockAverageItemsResponse),
  tradeItems: jest.fn(),
  addItemsToSurvivor: jest.fn(),
  fetchItems: jest.fn().mockResolvedValue(itemsList),
  createItems: jest.fn(),
  fetchSurvivors: jest.fn().mockResolvedValue(mockSurvivorData),
  createSurvivor: jest.fn(),
  setCurrentPage: jest.fn(),
  setOpenDrawer: jest.fn(),
  setMode: jest.fn(),
};
