import React from 'react'

function DeleteBreedingCenter({history}) {
    return (
        <div>
            {history.push("/dashboard/breeding")}
        </div>
    )
}

export default DeleteBreedingCenter
