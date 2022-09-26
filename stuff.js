fetch('/data.json').then(
    res => {
        res.json().then(
            data => {
                coordinateHtmlSet(data, 'weekly')
            }
        )
    }
)

function timeTextFunction(timeframe) {
    switch(timeframe) {
        case 'daily':
            return 'Day'
        case 'weekly':
            return 'Week'
        case 'monthly':
            return 'Month'
        default:
            return 'UNDEFINED'
    }
}

function setHtmlFromData(entry, timeframe) {
    let timeId = entry.title.toLowerCase() + "-time";
    let timeRecapId = entry.title.toLowerCase() + "-time-recap";
    let timeframeRecapId = entry.title.toLowerCase() + "-timeframe-recap";
    let timeTag = document.getElementById(timeId);
    let timeRecapTag = document.getElementById(timeRecapId);
    let timeframeRecapTag = document.getElementById(timeframeRecapId);

    timeTag.innerText = entry.timeframes[timeframe].current;
    timeRecapTag.textContent = " - " + entry.timeframes[timeframe].previous + "hrs";

    timeframeRecapTag.textContent = "Last " + timeTextFunction(timeframe);
}

function coordinateHtmlSet(data, timeframe) {
    data.forEach(x => this.setHtmlFromData(x, timeframe))
}

function renderData(timeframe) {
    fetch('/data.json').then(
        res => {
            res.json().then(
                data => {
                    switch(timeframe) {
                        case 'daily':
                            coordinateHtmlSet(data, 'daily')
                            break;
                        case 'weekly':
                            coordinateHtmlSet(data, 'weekly')
                            break;
                        case 'monthly':
                            coordinateHtmlSet(data, 'monthly')
                            break;
                        default:
                            coordinateHtmlSet(data, 'daily')
                            break;
                    }
                }
            )
        }
    )
}