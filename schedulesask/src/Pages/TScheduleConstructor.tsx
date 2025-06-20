import LayoutAdministrator from "../components/Headers/LayoutAdministrator"
import TScheduleConstructorBody from "../components/Body/TScheduleConstructorBody"

const TScheduleConstructor = () => {
    return (
        <div className='wrapper'>
            <LayoutAdministrator></LayoutAdministrator>
            <TScheduleConstructorBody></TScheduleConstructorBody>
        </div>

    );
};
export default TScheduleConstructor;