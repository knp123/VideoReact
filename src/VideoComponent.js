import React from 'react';
import video from './Video1.mp4';
import './VideoComponent.css';
export default class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            element : [{name: 'video', container: 'first'}]
         };
    }

    onDragOver = (e) => {
        e?.preventDefault();
    }

    onDragStart = (e, id) => {
        console.log('on drag start');
        e?.dataTransfer.setData("text/plain", id);
    }

    onDrop = (e, selected) => {
       let id = e.dataTransfer.getData("text/plain");
       
       let element = this.state.element.filter((ele) => {
           if (ele.name === id) {
               ele.container = selected;
           }
           return ele;
       });

       this.setState({
           ...this.state,
           element
       });
    }

    render() {
        let containerElements = {
            first: [],
            second: [],
            third: [],
            fourth: []
        };
        this.state.element.forEach(ele => {
            containerElements[ele.container].push(
                <video
                    className="draggable"
                    controls
                    muted={true}
                    width='200px'
                    height='300px'
                    key={ele.name}
                    onDragStart={(e) => this.onDragStart(e,ele.name)}
                    draggable
                >
                    <source src={video} type="video/mp4" />
                </video>
            )
        })
        return (
            <div className = 'container'>
                <div className="div1" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => { this.onDrop(e, "first") }}>
                    <span id = 'name'>Container 1</span>
                    {containerElements.first}
                </div>
                <div className="div2" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => { this.onDrop(e, "second") }}>
                    <span id = 'name'>Container 2</span>
                    {containerElements.second}
                </div>
                <div className="div3" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => { this.onDrop(e, "third") }}>
                    <span id = 'name'>Container 3</span>
                    {containerElements.third}
                </div>
                <div className="div4" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => { this.onDrop(e, "fourth") }}>
                    <span id = 'name'>Container 4</span>
                    {containerElements.fourth}
                </div>
            </div>
        );
    }
}