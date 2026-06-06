export interface Destination {
  id: number;
  name: string;
  country: string;
  state: string;
  category: 'Beach' | 'Mountain' | 'Monument';
  image: string;
  description: string;
  price: number;
  currency: string;
  lat: number;
  lng: number;
  highlights: string[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: 'Goa Beach Escape',
    country: 'India',
    state: 'Goa',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Enjoy sunny beaches, water sports, and vibrant nightlife in Goa.',
    price: 12000,
    currency: 'INR',
    lat: 15.2993,
    lng: 74.1240,
    highlights: ['Beach stay', 'Water sports', 'Nightlife']
  },
  {
    id: 2,
    name: 'Manali Hills Retreat',
    country: 'India',
    state: 'Himachal Pradesh',
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'A peaceful mountain getaway with snow views and adventure spots.',
    price: 18000,
    currency: 'INR',
    lat: 32.2432,
    lng: 77.1892,
    highlights: ['Snow mountains', 'Scenic valleys', 'Adventure']
  },
  {
    id: 3,
    name: 'Taj Mahal Heritage Tour',
    country: 'India',
    state: 'Uttar Pradesh',
    category: 'Monument',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Explore one of the world’s most iconic monuments with guided access.',
    price: 9500,
    currency: 'INR',
    lat: 27.1751,
    lng: 78.0421,
    highlights: ['Heritage site', 'Guided visit', 'Photography']
  },
  {
    id: 4,
    name: 'Miami Beach Vacation',
    country: 'USA',
    state: 'Florida',
    category: 'Beach',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    description: 'Relax by the ocean and enjoy a vibrant coastal city experience.',
    price: 420,
    currency: 'USD',
    lat: 25.7907,
    lng: -80.1300,
    highlights: ['Oceanfront', 'City life', 'Luxury stay']
  },
  {
    id: 5,
    name: 'Aspen Mountain Escape',
    country: 'USA',
    state: 'Colorado',
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    description: 'A premium mountain destination with scenic peaks and fresh air.',
    price: 680,
    currency: 'USD',
    lat: 39.1911,
    lng: -106.8175,
    highlights: ['Mountain view', 'Nature trails', 'Luxury cabins']
  },
  {
    id: 6,
    name: 'Statue of Liberty Explorer',
    country: 'USA',
    state: 'New York',
    category: 'Monument',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80',
    description: 'Visit a world-famous monument with skyline views and ferry access.',
    price: 260,
    currency: 'USD',
    lat: 40.6892,
    lng: -74.0445,
    highlights: ['Ferry ride', 'Monument visit', 'Skyline view']
  }
];