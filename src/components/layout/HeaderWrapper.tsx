
import { Header } from './Header';
import { useLocation } from 'react-router-dom';

export function HeaderWrapper() {
  // This will throw an error if not in a Router context
  // But we'll only use this component inside routes where Router exists
  const location = useLocation();
  
  return <Header />;
}
