import React, { useEffect, useState } from "react";
import { getUseOidcHook, getUseOidcAccessToken, NoSSOUserInfo } from "../../SSODisabledDefaults";
import UserInfo from "../../UserInfo";
import { SSOEnabled } from "../../configuration";

const MembershipEvals: React.FunctionComponent = () => {
    const { login, logout, isAuthenticated } = getUseOidcHook()()
    const { accessTokenPayload } = getUseOidcAccessToken()()
    const userInfo = SSOEnabled ? accessTokenPayload as UserInfo : NoSSOUserInfo

    // API urls
    const directorshipAttendanceUrl = `http://localhost:8080/api/attendance/directorship/${userInfo.preferred_username}`;
    const missedHouseMeetingsUrl = `http://localhost:8080/api/attendance/house/${userInfo.preferred_username}`;

    const [directorshipAttendance, setDirectorshipAttendance] = useState([]);
    const [missedHouseMeetings, setHouseMeetingAttendance] = useState([]);

    // Makes call to API for list of directorships and stores the response
    const fetchDirectorshipAttendance = () => {
        return fetch(directorshipAttendanceUrl)
            .then((res) => res.json())
            .then((directorships) => setDirectorshipAttendance(directorships))
    }

    // Makes call to API for list of missed house meetings and stores the response
    const fetchHouseMeetingAttendance = () => {
        return fetch(missedHouseMeetingsUrl)
            .then((res) => res.json())
            .then((houseMeeting) => setHouseMeetingAttendance(houseMeeting))
    }

    useEffect(() => {
        fetchDirectorshipAttendance();
        fetchHouseMeetingAttendance();
    }, []);

    return (
        <div className="table">
            <table className="table table-striped box-shadow">
                <thead className="table-header">
                    <tr className="heading">
                        <th className="table-striped header-label">Membership Evals</th>
                        <th className="table-striped header-data">Route Not Implemented</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Number of directorships attended */}
                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Directorship Meetings</td>
                        <td className="table-striped row-data">{directorshipAttendance.length} / 30</td>
                    </tr>

                    {/* Number of missed house meetings (excluding excused absences) */}
                    <tr className="table-striped table-row row-index-odd">
                        <td className="table-striped row-label">House Meetings Missed</td>
                        <td className="table-striped row-data">{missedHouseMeetings.length}</td>
                    </tr>

                    {/* Number of major projects passed */}
                    <tr className="table-striped table-row row-index-even">
                        <td className="table-striped row-label">Major Project</td>
                        <td className="table-striped row-data">Route Not Implemented</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}


export default MembershipEvals