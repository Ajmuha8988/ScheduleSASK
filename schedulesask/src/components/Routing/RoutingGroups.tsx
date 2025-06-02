import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetNameGroups } from '../utils/db/get/GetGroup' ;
import "../Headers/mobileheaders.css"

const RoutingGroup: React.FC<Props> = ({ onRouting }) => {
    const navigate = useNavigate();
    return (
        <button className= "btn btn-warning text-light mobile-button ms-2" onClick={() => navigate('/teachers/ungroups')}>
            Группа
        </button>
    );
};
export default RoutingGroup;