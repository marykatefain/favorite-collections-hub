
// Mock data for feed items
export const getFeedMockData = () => [
  {
    id: "feed1",
    user: {
      id: "user1",
      username: "alice",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rank: "A",
    },
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
    item: {
      id: "item1",
      title: "The Shawshank Redemption",
      type: "movie",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    },
    collectionName: "Favorite Movies",
    collectionId: "collection1",
    likes: 24,
    comments: 5,
    zaps: 8,
  },
  {
    id: "feed2",
    user: {
      id: "user2",
      username: "bob",
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      rank: "B",
    },
    timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
    item: {
      id: "item21",
      title: "Bohemian Rhapsody",
      type: "music",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    },
    collectionName: "Favorite Music",
    collectionId: "collection3",
    likes: 42,
    comments: 12,
    zaps: 15,
  },
  {
    id: "feed3",
    user: {
      id: "user3",
      username: "carol",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rank: "C",
    },
    timestamp: new Date(Date.now() - 86400 * 1000).toISOString(),
    item: {
      id: "item11",
      title: "Sapiens: A Brief History of Humankind",
      type: "book",
      imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    },
    collectionName: "Favorite Books",
    collectionId: "collection2",
    likes: 18,
    comments: 3,
    zaps: 5,
  },
  {
    id: "feed4",
    user: {
      id: "user4",
      username: "dave",
      avatarUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
      rank: "B",
    },
    timestamp: new Date(Date.now() - 172800 * 1000).toISOString(),
    item: {
      id: "item31",
      title: "The Shining",
      type: "movie",
      imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
    },
    collectionName: "Horror Movies",
    collectionId: "collection4",
    likes: 31,
    comments: 7,
    zaps: 12,
  },
  {
    id: "feed5",
    user: {
      id: "user5",
      username: "eve",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rank: "A",
    },
    timestamp: new Date(Date.now() - 259200 * 1000).toISOString(),
    item: {
      id: "item22",
      title: "Stairway to Heaven",
      type: "music",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    },
    collectionName: "Favorite Music",
    collectionId: "collection3",
    likes: 57,
    comments: 15,
    zaps: 23,
  },
];
