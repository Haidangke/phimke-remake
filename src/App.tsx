import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Header from 'components/Header';
import Footer from 'components/Footer';
import NotFoundPage from 'components/NotFound';
import HomePage from 'features/browse';
import DiscoverPage from 'features/discover';
import DetailPage from 'features/detail';
import SearchPage from 'features/search';
import LoginPage from 'features/auth/page/Login';
import HistoryPage from 'features/history';
import './App.scss';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-loading-skeleton/dist/skeleton.css';

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route
                    path='*'
                    element={
                        <div className='app'>
                            <Header />
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/discover/:id' element={<DiscoverPage />} />
                                <Route path='/:category/:id/*' element={<DetailPage />} />
                                <Route path='/search/:keyword' element={<SearchPage />} />
                                <Route path='/history' element={<HistoryPage />} />
                                <Route path='*' element={<NotFoundPage />} />
                            </Routes>
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
