import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

class Map extends React.Component<{}, {lat:number,lon:number,direction:number,alt:number,connected:boolean,viewport:any}> {
    interval: any;
    constructor(props:any) {
        super(props);
        this.state = {
            lat: 60,
            lon: 14,
            direction: 0,
            alt: 0,
            connected: false,
            viewport: {
                longitude: 14,
                latitude: 60,
                zoom: 4
            }
        }
        this.updateViewPort = this.updateViewPort.bind(this);

    }
    componentDidMount() {
        this.interval = setInterval(() => this.GetPlaneInfo(), 1000);
    }
    updateViewPort(event:any) {
        
        this.setState({
            viewport: {
                longitude: event.longitude,
                latitude: event.latitude,
                zoom: event.zoom
            }
        })
    }
    GetPlaneInfo() {
        axios.get("http://localhost:8888/").then((result) => {
            this.setState({
                lat: result.data.lat,
                lon: result.data.lon,
                direction: result.data.direction,
                alt: result.data.alt,
                connected: true
            })
            
        }).catch(()=>
            this.setState({connected:false})
        )
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let Alert: JSX.Element = this.state.connected ? (<></>) : (<div className="fixed bottom-10 right-10 z-10 bg-red-500 w-64 h-24 rounded-md flex flex-row justify-center	" ><div className="text-white m-auto text-center">Could not connect to server</div></div>)
    return (
        <>
            <ReactMapGL
                className="map"
                width="100vw"
                height="100vh"
                {...this.state.viewport}
                onViewportChange={this.updateViewPort}
                mapboxApiAccessToken="pk.eyJ1IjoiYXhkcmEiLCJhIjoiY2tuMmI5c3pvMG9haTJvbnp2ZmllMm1lZSJ9.fWXmDNZNCpAWA7hIGbvtVA"
            >
                <Marker latitude={this.state.lat} longitude={this.state.lon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="24" width="24" transform={`rotate(0 0 0 )`}>
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </Marker>
            </ReactMapGL>
            <button  className="fixed top-4 left-4 z-10 bg-blue-500 px-4 py-2 hover:bg-blue-400 text-white focus:bg-blue-600 rounded-md">Update Position</button>
            {Alert}
        </>
    );
     }
 }
export default Map