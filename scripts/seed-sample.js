// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedSampleData() {
  console.log('🏀 Seeding sample sports courts data...');

  try {
    // Create sample sport types
    const sportTypes = await Promise.all([
      prisma.sportType.upsert({
        where: { name: 'basketball' },
        update: {},
        create: {
          name: 'basketball',
          displayName: 'Basketball',
          description: 'Outdoor and indoor basketball courts',
          icon: '🏀'
        }
      }),
      prisma.sportType.upsert({
        where: { name: 'tennis' },
        update: {},
        create: {
          name: 'tennis',
          displayName: 'Tennis',
          description: 'Tennis courts for singles and doubles',
          icon: '🎾'
        }
      }),
      prisma.sportType.upsert({
        where: { name: 'pickleball' },
        update: {},
        create: {
          name: 'pickleball',
          displayName: 'Pickleball',
          description: 'Pickleball courts - fastest growing sport',
          icon: '🏓'
        }
      })
    ]);

    // Create sample courts
    const courts = await Promise.all([
      prisma.court.create({
        data: {
          name: 'Central Park Basketball Court',
          description: 'Popular outdoor basketball court in downtown area',
          sportTypes: ['basketball'],
          address: '123 Main St',
          city: 'Hickory',
          state: 'NC',
          zipCode: '28601',
          latitude: 35.7344,
          longitude: -81.3444,
          amenities: ['lighting', 'parking', 'restrooms'],
          surface: 'asphalt',
          isActive: true,
          verified: true
        }
      }),
      prisma.court.create({
        data: {
          name: 'Recreation Center Tennis Courts',
          description: 'Four professional tennis courts with lighting',
          sportTypes: ['tennis'],
          address: '456 Oak Ave',
          city: 'Hickory',
          state: 'NC',
          zipCode: '28602',
          latitude: 35.7444,
          longitude: -81.3544,
          amenities: ['lighting', 'parking', 'pro shop'],
          surface: 'hard court',
          isActive: true,
          verified: true
        }
      }),
      prisma.court.create({
        data: {
          name: 'Community Pickleball Complex',
          description: 'New pickleball facility with 8 courts',
          sportTypes: ['pickleball'],
          address: '789 Pine St',
          city: 'Hickory',
          state: 'NC',
          zipCode: '28603',
          latitude: 35.7544,
          longitude: -81.3644,
          amenities: ['lighting', 'parking', 'restrooms', 'pro shop'],
          surface: 'concrete',
          isActive: true,
          verified: true
        }
      })
    ]);

    console.log(`✅ Created ${sportTypes.length} sport types and ${courts.length} sample courts`);
    console.log('🎯 Sample data seeding complete!');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedSampleData()
  .finally(() => prisma.$disconnect());
