import { startFlowServer } from '@genkit-ai/express';
import { packingHelperFlow } from './flows/packingHelper.js';
import { purchaseFlow } from './flows/purchase.js';

startFlowServer({
    port: 2222,
    cors: {
        origin: "*",
    },
    flows: [packingHelperFlow, purchaseFlow],
});