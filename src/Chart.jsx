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
                    return(
                        <div onMouseEnter={() => {handleHover(); handleSelect(report)}} onMouseLeave={handleLeave} style={{opacity: selected === report ? 0.75 : 1}} className="bar-area col-center">
                            <div className="amount" style={{display: selected === report ? visible : null}}>${report.amount}</div>
                            <div className="bar" style={{height: report.amount*3.5, background: largestBar() === report.amount ? "hsl(186, 34%, 60%)" : null}}></div>
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