import React from 'react';

const Logout = () => {
    const logout = () => {
        localStorage.setItem("token", "")
    }
    return (
        <div>
            <button onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket icon-width"></i></button>
        </div>
    );
};

export default Logout;