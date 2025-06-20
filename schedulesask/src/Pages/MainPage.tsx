import LayoutMain from "../components/Headers/LayoutMain";
import RouteRole from '../utils/JWTAuth/Auth';
import { BeatLoader } from 'react-spinners';
import TableForSchedules from "../components/Body/TableForSchedules"

const MainPage = () => {
    const { loading } = RouteRole(); // Получаем флаг загрузки
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <BeatLoader color="#ffc107" size={20} />
                </div>
            ) : (
                    <div className='wrapper'>
                        <LayoutMain></LayoutMain>
                        <TableForSchedules></TableForSchedules>
                    </div>
            )}
        </>
    );
};

export default MainPage;
