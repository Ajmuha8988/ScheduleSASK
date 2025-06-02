import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "../Headers/mobileheaders.css"


const ErrorBody = () => {
    return (
        <body className="font-for-headers container text-center">
            <h1>Вы не имеете должными правами на эту страницу</h1>
            <h1>Пожалуйста, войдите в систему!</h1>
        </body>
    );
};

export default ErrorBody;