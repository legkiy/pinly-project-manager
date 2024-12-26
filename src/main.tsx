import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ConfigLayput from './configs/ConfigProvider';
import '@/configs/i18n';
import './dev.css';

createRoot(document.getElementById('root')!).render(<ConfigLayput />);
