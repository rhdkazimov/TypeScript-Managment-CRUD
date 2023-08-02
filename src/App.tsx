import { BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient();

export function App() { 
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );  
}
