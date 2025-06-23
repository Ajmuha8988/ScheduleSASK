import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./mobilebody.css"
import AddGroup from './ModalGroups';


const UnBodyGroups = () => {
    return (
        <>
            <body className="font-for-headers container text-center content">
                <h1>У вас пока нету руководящей группы</h1>
                <h1>
                    Нажмите на кнопку <AddGroup></AddGroup> чтобы создать новую группу
                </h1>
            </body>
        </>
        
    );
};

export default UnBodyGroups;