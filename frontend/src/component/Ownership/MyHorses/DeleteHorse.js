import React from 'react'
import { withRouter } from 'react-router-dom';

function DeleteHorse({history}) {
    return (
        <div>
            {history.push("/myhorses")}
        </div>
    )
}

export default withRouter(DeleteHorse);