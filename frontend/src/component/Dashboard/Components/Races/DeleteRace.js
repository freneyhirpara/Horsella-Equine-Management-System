import React from 'react'

function DeleteRace({history}) {
    return (
        <div>
            {history.push("/dashboard/races")}
        </div>
    )
}

export default DeleteRace
