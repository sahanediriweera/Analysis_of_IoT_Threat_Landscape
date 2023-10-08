import {
    Typography,
    Layout,
    Row,
    Col,
    Affix,
    Image,
    Button,
    Tooltip,
    Popover,
} from 'antd'

import {
    DownloadOutlined,
} from '@ant-design/icons'

import {
    motion,
} from 'framer-motion'

import {
    useContext,
} from 'react'

import { Context } from './Context'
import { useNavigate } from 'react-router';

import { BASE_URL } from '../../../src/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../firebase';
import React, { useState } from 'react';
import axios from 'axios';




// props: image
function FloatImageCol(props) {
    return (
        <Col span={12}>
            <Row justify='center'>
            <motion.div 
                    initial={{y: 300, opacity: 0}} 
                    whileInView={{y: 0, opacity: 1, transition: {type: 'spring', bounce: 0, duration: 1}}} 
                    viewport={{once: true}}>
                <Image height={400} preview={false} src={props.image} style={{'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}></Image>
            </motion.div>
            </Row>
        </Col>
    )
}

// props title, text
function FloatTextCol(props) {
    return (
        <Col span={12}>
            <motion.div 
                    initial={{y: 300, opacity: 0}} 
                    whileInView={{y: 0, opacity: 1, transition: {type: 'spring', bounce: 0, duration: 1}}} 
                    viewport={{once: true}}>
                <Row justify='center' style={{'padding': '0px 50px'}}>
                    <Typography.Title>
                        {props.title}
                    </Typography.Title>
                </Row>
                <Row justify='center' style={{'padding': '0px 50px'}}>
                    <Typography style={{'fontSize': '16px'}}>
                        {props.text}
                    </Typography>
                </Row>
            </motion.div>
        </Col>
    )
}

// props: sectionItem, backgroundColor
function SectionItemImageOnTheLeft(props) {
    return (
        <Row justify='center' align='middle' style={{'backgroundColor': props.backgroundColor, 'height': '700px', 'padding': '100px'}}>
            <Row justify='center' align='middle' style={{'maxWidth': '2000px'}}>
                <FloatImageCol image={props.sectionItem.image} />
                <FloatTextCol title={props.sectionItem.title} text={props.sectionItem.text} />
            </Row>
        </Row>
    )
}

// props: sectionItem, backgroundColor
function SectionItemImageOnTheRight(props) {
    return (
        <Row justify='center' align='middle' style={{'backgroundColor': props.backgroundColor, 'height': '700px', 'padding': '100px'}}>
            <Row justify='center' align='middle' style={{'maxWidth': '2000px'}}>
                <FloatTextCol title={props.sectionItem.title} text={props.sectionItem.text} />
                <FloatImageCol image={props.sectionItem.image} />
            </Row>
        </Row>
    )
}

// props: sectionList
function SectionList(props) {
    return (
        <>
        {
            props.sectionList.map((sectionItem, index) => {
                return (
                    index % 2 === 0?
                        <SectionItemImageOnTheLeft sectionItem={sectionItem} backgroundColor={'white'} />
                        :
                        <SectionItemImageOnTheRight sectionItem={sectionItem} backgroundColor={null} />
                )

            })
        }
        </>
    )
}



function Desktop() {
    const { state, dispatch } = useContext(Context);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const ClickHandle = async () => {
        // Check if the user is logged in
        if (!user) {
        // User is not logged in, redirect to the login page
        navigate('/login'); // Replace '/login' with your actual login route
        return; // Exit the function to prevent further execution
        }

        try {
        const response = await axios.get(`${BASE_URL}network_scan`);
        console.log(response);

        try {
            const parsedData = JSON.parse(response.data);
            // Step 2: Extract all "Device Name" values
            const deviceNames = parsedData.map(item => item["Device Name"]);
            const deviceIP = parsedData.map(item => item["IP"]);
            console.log(deviceNames);
            navigate('/radarDisplay', { state: { deviceNames, deviceIP } });
        } catch (jsonParseError) {
            console.error('Error occurred while parsing JSON data:', jsonParseError);
        }
        } catch (error) {
        console.error('Error occurred while making the API request:', error);
        }
    }

    return (
        <Layout style={{'minWidth': '1000px'}}>
            {/* <Affix offsetTop={0}>
                <Layout.Header style={{'background': 'white', 'height': '70px'}}>
                    <Row justify='center' align='top' style={{'backgroundColor': 'white', 'height': '100%'}}>
                        <Row justify='start' align='top' style={{'maxWidth': '2000px', 'width': '100%', 'height': '100%', 'backgroundColor': 'white'}}>
                            <Col offset={1} style={{'cursor': 'pointer'}} onClick={() => { window.scrollTo(0, 0)}}>
                                <Row justify='center' align='bottom'>
                                    <Col>
                                        <Image height={30} preview={false} src={state.appLogo}></Image>
                                    </Col>
                                    <Col>
                                        <Typography.Title level={3} style={{'color': 'black', 'marginLeft': '10px'}}>{state.appName}</Typography.Title>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Layout.Header>
            </Affix> */}

            <Layout.Content>
                {/* cover headline */}
                <Row justify='center' align='middle' style={{'backgroundColor': 'white', 'height': '1000px'}}>
                <Row justify='center' align='middle' style={{'maxWidth': '2000px'}}>
                    <Col style={{'width': '40%'}}>
                        <Row justify='right' style={{'padding': '0px 150px'}}>
                            <Typography.Title style={{'fontSize': '50px'}} >
                                {state.coverTitle} 
                            </Typography.Title>
                        </Row>

                        <Row justify='right' style={{'padding': '10px 150px'  }}>
                            <Typography style={{'fontSize': '15px'}} >
                                {state.coverText}
                            </Typography>
                        </Row>

                        <Row justify='right' style={{'padding': '20px 150px'}}>
                            {/* {
                                state.appleStoreLink &&
                                <Col style={{'width': '200px'}}>
                                    <Row justify='center'>
                                    <a href={state.appleStoreLink} target='_blank' rel="noopener noreferrer">
                                        <Image height={50} preview={false} src={state.appleStoreBadge}></Image>
                                    </a>
                                    </Row>
                                </Col>
                            }
                            {
                                state.googlePlayLink &&
                                <Col style={{'width': '150px'}}>
                                    <Row justify='center'>
                                    <a href={state.googlePlayLink} target='_blank' rel="noopener noreferrer">
                                        <Image height={50} preview={false} src={state.googlePlayBadge}></Image>
                                    </a>
                                    </Row>
                                </Col>
                            }                            */}

                            <button onClick={ClickHandle} className="scan-btn bg-blue-500 text-white py-3 px-6 rounded-full hover:animate-pulse">
                                SCAN NOW
                            </button>
                        </Row>
                    </Col>

                    <Col style={{'width': '60%'}}>
                        <Row justify='center'>
                        <Image width={800} height={700} preview={false} src={state.coverImage}></Image>
                        </Row>
                    </Col>
                </Row>
                </Row>


                {/* endorsement list */}
                <Row justify='center' align='middle' style={{'height': '700px', 'padding': '100px'}}>
                <Row justify='center' align='middle' style={{'maxWidth': '2000px'}}>
                
                    <motion.div 
                            initial={{y: 300, opacity: 0}} 
                            whileInView={{y: 0, opacity: 1, transition: {type: 'spring', bounce: 0, duration: 1}}} 
                            viewport={{once: true}}>
                        <Row justify='center'>
                            <Typography.Title>
                                {state.endorsementTitle}
                            </Typography.Title>
                        </Row>
                        <Row justify='center'>
                            <Typography style={{'fontSize': '16px'}}>
                                {state.endorsementText}
                            </Typography>
                        </Row>

                        <Row justify='center' style={{'marginTop': '50px'}}>
                            {
                                state.endorsementList.map((endorsementItem, index) => {
                                    return (
                                        <Col span={3}>
                                            <Tooltip placement='top' title={endorsementItem.title} color={endorsementItem.titleColor}>
                                            <a href={endorsementItem.URL} target='_blank' rel="noopener noreferrer">
                                                <Image height={70} preview={false} src={endorsementItem.image} style={{'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}></Image>
                                            </a>
                                            </Tooltip>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </motion.div>
                    
                </Row>
                </Row>

                {/* section list */}
                <SectionList sectionList={state.sectionList} />


                {/* policies */}
                

            
            </Layout.Content>

        </Layout>
    )
}

export default Desktop