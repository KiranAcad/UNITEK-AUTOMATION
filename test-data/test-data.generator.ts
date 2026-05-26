/**
 * Test Data Generator
 * -------------------
 * Dynamic test data generation using @faker-js/faker.
 * Generates random but realistic data for form filling and test scenarios.
 */

import { faker } from '@faker-js/faker';
import { CAMPUS_OPTIONS } from '../constants/app.constants';

/** Lead form data shape */
interface GeneratedLeadData {
  campus: string;
  program: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

/** Bottom form data shape */
interface GeneratedBottomFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  zipcode: string;
}

export class TestDataGenerator {
  /**
   * Generate a complete lead form dataset with random data.
   */
  static generateLeadData(): GeneratedLeadData {
    const campuses = [...CAMPUS_OPTIONS];
    return {
      campus: faker.helpers.arrayElement(campuses),
      program: faker.helpers.arrayElement([
        'Medical Assisting',
        'Vocational Nursing',
        'Bachelors of Science in Nursing',
      ]),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.string.numeric(10),
      email: faker.internet.email({ provider: 'testautomation.com' }),
    };
  }

  /**
   * Generate a random email address.
   */
  static generateRandomEmail(): string {
    return faker.internet.email({ provider: 'testautomation.com' });
  }

  /**
   * Generate a random US phone number (10 digits).
   */
  static generateRandomPhone(): string {
    return faker.string.numeric(10);
  }

  /**
   * Generate a random first name.
   */
  static generateRandomFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate a random last name.
   */
  static generateRandomLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate a random US zip code.
   */
  static generateRandomZipCode(): string {
    return faker.location.zipCode('#####');
  }

  /**
   * Generate bottom form data.
   */
  static generateBottomFormData(): GeneratedBottomFormData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email({ provider: 'testautomation.com' }),
      phone: faker.string.numeric(10),
      state: faker.helpers.arrayElement(['CA', 'NV', 'OR', 'WA']),
      zipcode: faker.location.zipCode('#####'),
    };
  }

  /**
   * Generate a random campus from the known list.
   */
  static getRandomCampus(): string {
    return faker.helpers.arrayElement([...CAMPUS_OPTIONS]);
  }
}
