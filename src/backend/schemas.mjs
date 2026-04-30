import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().describe('The unique identifier for the user.'),
  email: z.string().email().describe('The primary email address of the user.'),
  role: z.enum(['admin', 'member', 'guest']).default('guest').describe('The access level granted to the user.'),
  createdAt: z.string().datetime().describe('ISO 8601 timestamp of when the user was created.'),
  metadata: z.object({
    lastLogin: z.string().datetime().optional().describe('Timestamp of the last successful login.'),
    preferences: z.record(z.string()).optional().describe('Arbitrary key-value pairs for user preferences.')
  }).optional().describe('Optional metadata associated with the user profile.')
});

export const OrganizationSchema = z.object({
  orgId: z.string().uuid().describe('The unique identifier for the organization.'),
  name: z.string().min(2).max(100).describe('The display name of the organization.'),
  tier: z.enum(['free', 'pro', 'enterprise']).describe('The billing tier the organization is currently on.'),
  memberCount: z.number().int().nonnegative().describe('The current number of active members.'),
  isVerified: z.boolean().describe('Whether the organization has completed domain verification.')
});

export const EnterpriseBillingSchema = z.object({
  invoiceId: z.string().uuid().describe('The unique identifier for the invoice.'),
  status: z.union([
    z.literal('draft'),
    z.literal('open'),
    z.literal('paid'),
    z.literal('void'),
    z.literal('uncollectible')
  ]).describe('The current status of the invoice.'),
  totalAmount: z.number().int().nonnegative().describe('Total invoice amount in cents.'),
  currency: z.string().length(3).describe('Three-letter ISO currency code.'),
  customer: z.object({
    customerId: z.string().describe('Stripe customer ID.'),
    billingAddress: z.object({
      line1: z.string().describe('Address line 1 (e.g., street, PO Box).'),
      line2: z.string().optional().describe('Address line 2 (e.g., apartment, suite).'),
      city: z.string().describe('City, district, suburb, town, or village.'),
      country: z.string().length(2).describe('Two-letter country code (ISO 3166-1 alpha-2).')
    }).describe('The primary billing address for tax purposes.')
  }).describe('Details about the customer being billed.'),
  lineItems: z.array(z.object({
    itemId: z.string().describe('Unique identifier for the line item.'),
    description: z.string().describe('A brief description of the product or service.'),
    quantity: z.number().int().positive().describe('The quantity purchased.'),
    unitAmount: z.number().int().nonnegative().describe('Cost per unit in cents.')
  })).describe('The individual items or subscriptions included in this invoice.'),
  metadata: z.record(z.string(), z.string()).optional().describe('Arbitrary key-value metadata attached to the invoice.')
});

export const schemas = {
  User: UserSchema,
  Organization: OrganizationSchema,
  EnterpriseBilling: EnterpriseBillingSchema
};
