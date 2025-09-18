import express from 'express';
import * as clientController from '../controllers/clientController.js';

const router = express.Router();

// Removed Clerk auth middleware

// Specific routes first
router.get('/clients/search', clientController.searchClients); 

// General collection routes
router.get('/clients', clientController.getClients);
router.post('/clients', clientController.createClient);

// Dynamic routes (with an :id parameter) last
router.put('/clients/:id', clientController.updateClient);
router.delete('/clients/:id', clientController.deleteClient);

export default router;
