import React from 'react'
import Helmet from 'react-helmet'



const Metadata = ({Title}) => {
    return (
        <Helmet> 
            <title>{Title}</title>
        </Helmet>
    )
}

export default Metadata
