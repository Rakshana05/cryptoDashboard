export default function Card(props) {
    return(
        <div className="card text-white text-center  m-3"
            style={{ width: "11rem", backgroundColor: "rgb(43, 43, 43)", marginTop: "0px !important" }}>
            <div className="card-body">
                <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}>{props.name}</h6>
                <p className="card-text fw-bold fs-5" style={{ color: "#fcdf03" }}>
                    {props.char ? props.val+"%" : "$"+props.val}
                </p>
            </div>
        </div>
    )
}