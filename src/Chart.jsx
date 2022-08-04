import React, {useState} from "react"
import Reports from "./data.json"

function Chart() {

    const [selected, setSelected] = useState(null)
    const [visible, setVisible] = useState(null)

    const handleSelect = (index) =>{
        setSelected(index)
    }

    const handleHover = () => {
        setVisible("block")
    }

    const handleLeave = () => {
        setVisible(null)
        setSelected(null)
    }


    const largestBar = () =>{
        let barNum = Math.max(...Reports.map(obj => obj.amount))
        return barNum
    }


    return(
        <section className="chart-container">
            <h2 onClick={largestBar} className="title">Spending - Last 7 Days</h2>
            <div className="bar-graph">
                {Reports.map(report => {

                    const opacityValue = selected === report ? 0.75 : 1;
                    const visibility = selected === report ? visible : null;
                    const heightValue = report.amount*3.5;
                    const cyanHighlight = largestBar() === report.amount ? "hsl(186, 34%, 60%)" : null

                    return(

                        <div 
                            onMouseEnter={() => {handleHover(); handleSelect(report)}} 
                            onMouseLeave={handleLeave} 
                            style={{opacity: opacityValue}}
                            className="bar-area col-center"
                        >
                            <div className="amount" style={{display: visibility }}>${report.amount}</div>
                            <div className="bar" style={{height: heightValue, background: cyanHighlight}}></div>
                            <p className="day">{report.day}</p>
                        </div>
                    )
                })}
            </div>
            <div className="summary">
                <article className="summary-info summary-info--left">
                    <p>Total this month</p>
                    <h1>$478.33</h1>
                </article>
                <article className="summary-info summary-info--right col-center">
                    <h4>+2.4%</h4>
                    <p>from last month</p>
                </article>
            </div>
        </section>
    )
}

export default Chart;