import {app} from './app';
import {connectDB} from './config/db'
import { handleInfo } from './utils/eventHandlers';
const {PORT} = process.env;


(async () => {
    try {
      await connectDB(); // Espera a que la conexión se establezca antes de iniciar el servidor
      
      app.listen(PORT, () => {
        handleInfo(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  })();