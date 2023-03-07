import React from "react"
import Image from "next/image"

export default function AuctionCard(props) {
    const { auctionId } = props
    return (
        <div>
            <div className="auctionCardWide" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div style={{ marginRight: "20px" }}>
                    <Image src="/500x300.png" width={250} height={150} alt="" />
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>John Doe</h2>
                    <p style={{ margin: 0 }}>Software Developer</p>
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <button style={{ borderRadius: "20px 0 0 20px", border: '1px solid gray' }}>+10</button>
                        <button>+50</button>
                        <button>+100</button>
                        <button style={{ borderRadius: "0 20px 20px 0", border: '1px solid gray' }}>+50000</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                        <div style={{ width: "25%", textAlign: "center" }}>5</div>
                        <div style={{ width: "25%", textAlign: "center" }}>:</div>
                        <div style={{ width: "25%", textAlign: "center" }}>30</div>
                        <div style={{ width: "25%", textAlign: "center" }}>PM</div>
                    </div>
                </div>
            </div>
            <div className="auctionCard" style={{ alignItems: "center", justifyContent: "space-around" }}>
                <div style={{ marginRight: "20px" }}>
                    <Image src="/500x300.png" width={125} height={75} alt="" />
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                        <div style={{ width: "25%", textAlign: "center" }}>5</div>
                        <div style={{ width: "25%", textAlign: "center" }}>:</div>
                        <div style={{ width: "25%", textAlign: "center" }}>30</div>
                        <div style={{ width: "25%", textAlign: "center" }}>PM</div>
                    </div>
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>John Doe</h2>
                    <p style={{ margin: 0 }}>Software Developer</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <button style={{ borderRadius: "20px 0 0 20px", border: '1px solid gray' }}>+10</button>
                        <button>+50</button>
                        <button>+100</button>
                        <button style={{ borderRadius: "0 20px 20px 0", border: '1px solid gray' }}>+50000</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
