import '../Doctor/doctor.css';
import {useQuery} from "@tanstack/react-query";
import {fetchDoctorById, fetchScheduleDoctorBydate} from "../Services/Doctor/doctorService";
import React, {useEffect, useState} from "react";
import {Button, Select} from "antd";
import {ScheduleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {GetDates} from "../Utils/Utils";
import Loading from "./Loading";
import {scheduleInfo} from "../DATA/doctor/doctorData";
import {ICON} from "../DATA/Booking/bookingdata";

const ScheduleChoose = ({id}) => {
    const nextSevenDays = GetDates(new Date(), 7);
    const [scheduleValue, setScheduleValue] = useState(nextSevenDays[0].value);
    const {
        data: doctorSchedules,
        error,
        isError,
        isLoading,
        isFetching,
        refetch: refetchSchedule
    } = useQuery({
        queryKey: ['doctorSchedules', id, scheduleValue],
        queryFn: () => fetchScheduleDoctorBydate(id, scheduleValue)
    })

    const {
        data: doctor,
        isLoading: isDoctorDataLoading,
        isFetching: isDoctorDataFetching,
    } = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => fetchDoctorById(id)
    })

    const time = doctorSchedules && doctorSchedules.time !== '' ? JSON.parse(doctorSchedules.time) : []
    const onScheduleClick = (value) => {
        setScheduleValue(value)
        refetchSchedule()
    }

    useEffect(() => {
        return (() => {
            const bookingData = {
                scheduleDate: scheduleValue,
            }
            localStorage.setItem(`booking_${id}`, JSON.stringify(bookingData));
        })
    }, [id, scheduleValue])

    return (
        <>
            {isDoctorDataFetching || isDoctorDataLoading ?
                <Loading/>
                :
                <div className="doctor-schedule-choose-right">
                    <div className="schedule-container">
                        <Select
                            defaultValue={nextSevenDays[0]}
                            style={{width: '200px'}}
                            onChange={onScheduleClick}
                            options={nextSevenDays}
                        />
                    </div>
                    <div className="bold">
                        <ScheduleOutlined className="color-primary"/> <span className="color-primary">Schedule</span>
                    </div>
                    <div className="schedule-order margin-bottom">
                        <div style={{width:"100%"}}>
                            {doctorSchedules || time.length > 0
                                ?
                                <>
                                    <div className="choose-time">
                                        {time.map((item, index) =>
                                            <Link key={index} className="link" to={`/booking/${id}?time=${item.time}`}>
                                                <Button disabled={item.status}>{item.time}</Button>
                                            </Link>
                                        )}

                                    </div>
                                    <div>Choose and book a schedule (booking fee 0đ)</div>
                                    <div className="address-title line-top color-primary">PRICE: <span
                                        style={{color: 'black'}}>{scheduleInfo.price}.</span></div>
                                </>
                                : <div style={{textAlign: "center", opacity: 0.5, padding: "10px 0"}}>
                                    <div dangerouslySetInnerHTML={{__html: ICON}}/>
                                    <div>No data</div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
export default ScheduleChoose;
