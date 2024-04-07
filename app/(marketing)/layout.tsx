import { ThemeProvider } from '@/providers/theme-provider'
import { ClerkProvider } from "@clerk/clerk-react";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
    
         
                {children}
      
        
          </ThemeProvider>

   );
}
 
export default MarketingLayout;