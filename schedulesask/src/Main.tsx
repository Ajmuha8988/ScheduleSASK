import { createRoot } from 'react-dom/client'
import RountingPages from './Routers/RoutingPages'
import { BrowserRouter as Router } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
        <Router>
            <RountingPages></RountingPages>
        </Router>
)