import React from 'react'

function DeleteTrainingCenter({history}) {
    return (
        <div>
            {history.push("/dashboard/training")}
        </div>
    )
}

export default DeleteTrainingCenter
