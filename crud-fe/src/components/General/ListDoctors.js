import './ListDoctorStyle.css';
import {List} from "antd";
import {Link} from "react-router-dom";
import {Sanitized} from "../Utils/Utils";
import {Layout} from 'antd';
import React from "react";
import ScheduleChoose from "./ScheduleChoose";

const {Content} = Layout;

const ListDoctors = ({doctors}) =>{
    return(
        <List
            itemLayout="horizontal"
            dataSource={doctors.data}
            renderItem={(item) => (
                <Content
                    className="site-layout-background"
                    style={{
                        margin: 0,
                        minHeight:290,
                        backgroundColor: '#fff',
                        boxShadow: '0 1px 6px rgb(32 33 36 / 28%)',
                        borderRadius: '8px',
                        borderBottom: 'none',
                        marginBottom: '15px',
                        paddingLeft: '20px'
                    }}
                >
                    <div className="booking-time-style">
                        <List.Item className='doctor-list' style={{width:"50%",borderBottom:"none", paddingTop:"20px"}}>
                            <List.Item.Meta
                                avatar={<img style={{height: '80px'}} src={item.avatar} alt='123'/>}
                                title={<Link  to={`/doctors/${item.id}`}>{item.name}</Link>}
                                description={<Sanitized html={item.generalInfo}/>}
                            />
                        </List.Item>
                        <ScheduleChoose id={item.id} />
                    </div>
                </Content>
            )}
        />
    )
}

export default ListDoctors;
