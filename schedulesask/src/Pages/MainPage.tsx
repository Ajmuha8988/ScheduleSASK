import LayoutMain from "../components/Headers/LayoutMain";
import RouteRole from '../utils/JWTAuth/Auth';
import { BeatLoader } from 'react-spinners';

const MainPage = () => {
    const { loading } = RouteRole(); // Получаем флаг загрузки
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <BeatLoader color="#ffc107" size={20} />
                </div>
            ) : (
                <LayoutMain></LayoutMain>
            )}
        </>
    );
};

export default MainPage;
