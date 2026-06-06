import { z } from 'genkit';
import { ai } from "../ai.js";
import { OrderListSchema, orderedItem, shoppingTool } from "../tools/shopping.js";

// PURCHASE FLOW
// Input: Provide a list of items to order
// Output: An order confirmation of the items ordered, itemized prices, and total order cost.
export const purchaseFlow = ai.defineFlow(
    {
        name: 'purchaseFlow',
        inputSchema: OrderListSchema,
    }, async (input) => {

        var orderedList = [];
        var totalPrice = 0;

        for (var i = 0; i < input.items.length; i++) {
            const purchase = await ai.generate({
                prompt: `
                Follow these instructions:
                1.) Determine ONLY a single popular brand name that sells this item: ${JSON.stringify(input.items[i])}
                2.) Then search the DepartmentStore for this item from the identified popular brand name and buy quantity specified: ${JSON.stringify(input.items[i].quantity)}.`,
                tools: [shoppingTool],
                output: { schema: orderedItem }
            })
            totalPrice += purchase.output.totalPrice;
            orderedList.push(purchase.output);
        }

        return { totalPrice: parseFloat(totalPrice.toFixed(2)), orderedItems: orderedList };
    });
