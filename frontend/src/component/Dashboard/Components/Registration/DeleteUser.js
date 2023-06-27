import React from 'react'

function DeleteUser({history}) {
    return (
        <div>
            {history.push("/dashboard/users")}
        </div>
    )
}

export default DeleteUser
