import Card from "./Card"

export default function CardSection(props) {
    return (
        <div className="row m-3 mb-0" style={{ marginTop: ' 2px !important' }}>
            <Card name="All Time High" val={props.ath} />
            <Card name="All Time Low" val={props.atl} />
            <Card name="Market Cap 24Hrs" val={props.mCap24} char="%"/>
            <Card name="Positive Sentiments" val={props.sentiments} char="%" />
            <Card name="High 24Hrs" val={props.high24} />
            <Card name="Low 24Hrs" val={props.low24} />
        </div>
    )
}

