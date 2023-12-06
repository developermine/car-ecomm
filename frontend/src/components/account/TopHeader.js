import React from 'react'
import { useSelector } from 'react-redux';

const TopHeader = () => {
    const user = useSelector((state) => state.user);
  return (
    <div>
        <div className="gambo-Breadcrumb">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Home</li>
                                <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <div className="dashboard-group">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="user-dt">
                            <h4><b>Welcome:</b> {`${user.firstname} - ${user.lastname}`}</h4>
                            <p>{`${user.phone}`}</p>
                            {/* <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>0</span></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopHeader