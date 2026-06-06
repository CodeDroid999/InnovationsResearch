import { z } from 'genkit';
import { ai } from '../ai.js';

// Define input schema from client
export const itemToOrder = z.object({ name: z.string().describe('Name of the article of clothing, make sure to include a brand name'), quantity: z.number().describe('Quantity of the item to order') });
export const OrderListSchema = z.object({ items: z.array(itemToOrder) });

// Output 
export const orderedItem = z.object({ name: z.string().describe('Article of clothing'), quantity: z.number().describe('Quantity of this item that was ordered.'), price: z.number().describe('The price of the item ordered'), totalPrice: z.number().describe('Total price of the the items which is the price of the time X quantity.') });
export const orderedItemsList = z.object({
    orderedItems: z.array(orderedItem).describe('All of the items that were ordered'),
});

// Makes a fake API Call to "buy" an item in a certain quantity
// Returns an object containing the item name, quantity ordered, itemized price, and total price (itemized price * quantity).
// https://openweathermap.org/forecast16
async function searchFakeShoppingAPIAndBuy(item, quantity) {
    var itemizedPrice = parseFloat((Math.random() * 100).toFixed(2));
    var totalPrice = parseFloat(itemizedPrice * quantity);
    return { 'name': item, 'quantity': quantity, 'price': itemizedPrice, 'totalPrice': totalPrice }
}

// Define a Genkit tool to "buy" items from the DepartmentStore catalog
export const shoppingTool = ai.defineTool({
    name: 'shoppingTool',
    description: 'Search for an item in the DepartmentStore catalog and buy it.',
    inputSchema: itemToOrder,
    output: { schema: orderedItem }
}, async (input) => await searchFakeShoppingAPIAndBuy(input.name, input.quantity));
