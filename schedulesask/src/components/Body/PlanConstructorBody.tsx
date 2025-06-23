import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./mobilebody.css"
import AddPlanForm from './AddPlan';
import ListSemesterPlan from './ListSemesterPlan';
import ValidationAdministrator from '../../utils/Validation/ValidationPageAdministrator'
import { BeatLoader } from 'react-spinners';
import ScheduleFooter from "../Footer/ScheduleFooter"

const PlanConstructorBody = () => {
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
                            <AddPlanForm></AddPlanForm>
                            <ListSemesterPlan></ListSemesterPlan>
                        </body>
                        <ScheduleFooter></ScheduleFooter>
                </>
            )}
        </>
    );
};

export default PlanConstructorBody;