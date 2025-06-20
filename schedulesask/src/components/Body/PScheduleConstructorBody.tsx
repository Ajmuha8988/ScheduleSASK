import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./mobilebody.css"
import AddPScheduleForm from './AddPSchedule';
import TableForPSchedules from './TableForPSchedules';
import ValidationAdministrator from '../../utils/Validation/ValidationPageAdministrator'
import { BeatLoader } from 'react-spinners';
import ScheduleFooter from "../Footer/ScheduleFooter"

const PScheduleConstructorBody = () => {
    const { loading } = ValidationAdministrator(); // Получаем флаг загрузки
    return (
        <>
            {loading ? (
                <div className="spinner-container" >
                    <BeatLoader color="#ffc107" size={20} />
                </div >
            ) : (
                <>
                        <body className="font-for-headers container mt-3 content">
                            <AddPScheduleForm></AddPScheduleForm>
                            <TableForPSchedules></TableForPSchedules>
                        </body>
                        <footer>
                            <ScheduleFooter></ScheduleFooter>
                        </footer>
                </>
                
            )}
        </> 
    );
};

export default PScheduleConstructorBody;