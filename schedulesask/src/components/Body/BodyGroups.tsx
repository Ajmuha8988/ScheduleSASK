import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.slim.min.js"
import "@popperjs/core/dist/umd/popper.min.js"
import "./mobilebody.css"
import ListMembers from "./ListMembers"
import AddMembersForm from './AddMembers';
import RemoveGroupButton from './RemoveGroup';

const UnBodyGroups = () => {
    return (
        <body className="font-for-headers container mt-3">
            <div className="d-flex">
                    <AddMembersForm></AddMembersForm>
                    <RemoveGroupButton></RemoveGroupButton>
            </div>
            <ListMembers></ListMembers>
        </body>
    );
};

export default UnBodyGroups;