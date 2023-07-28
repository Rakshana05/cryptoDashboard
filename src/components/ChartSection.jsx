import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';

const ChartSection = (props) => {
  const [Price, setPrice] = useState({
    options: {
        chart: {
            id: 'area-datetime',
        },
        grid: {
            show: false
        }, title: {
            text: "Market Price (USD)",
            style: {
                fontSize: '14px', fontWeight: 'bold', color: "#fcdf03"
            }
        }, stroke: {
            curve: 'smooth'
        }, xaxis: {
            type: "datetime"
        }, dataLabels: {
            enabled: false
        }, yaxis: {
            show: false
        }, colors: ["#fcdf03"],
        tooltip: {
            y: {
                formatter: (value) => { return value.toFixed(2) }
            }, theme: "dark"
        }, selection: 365,
    },
    series: [
      {
        name: 'Market Price',
        data: [[1645837250522, 39804.53519937617]],
      },
    ],
  });

  const [Market_Cap, setMarketCap] = useState({
    options: {
        grid: {
            show: false
        }, title: {
            text: "Market Cap (USD)",
            style: {
                fontSize: '14px', fontWeight: 'bold', color: '#ff69f5'
            }
        }, stroke: {
            curve: 'smooth'
        }, xaxis: {
            type: "datetime"
        }, dataLabels: {
            enabled: false
        }, yaxis: {
            show: false
        }, colors: ["#ff69f5"],
        tooltip: {
            y: {
                formatter: (value) => { return value.toFixed(2) }
            }, theme: "dark"
        }
    },
    series: [
      {
        name: 'Market Cap (USD)',
        data: [[1645837250522, 39804.53519937617]],
      },
    ],
  });

  const [Tot_Vol, setTotVol] = useState({
    options: {
        grid: {
            show: false
        }, title: {
            text: "Market Volume",
            style: {
                fontSize: '14px', fontWeight: 'bold', color: "#00ffea"
            }
        }, stroke: {
            curve: 'smooth'
        }, xaxis: {
            type: "datetime"
        }, dataLabels: {
            enabled: false
        }, yaxis: {
            show: false
        }, colors: ["#00ffea"],
        tooltip: {
            y: {
                formatter: (value) => { return value.toFixed(2) }
            }, theme: "dark"
        }, 
    },
    series: [
      {
        name: 'Market Volume',
        data: [[1645837250522, 39804.53519937617]],
      },
    ],
  });

  const prevIdRef = useRef(0)
  const prevSelectionRef = useRef(0)

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [Price.options.selection, props.Id]);

  useEffect(() => {
    if (prevIdRef.current !== props.Id || prevSelectionRef.current !== Price.options.selection) {
      fetchData();
    }

    prevIdRef.current = props.Id;
    prevSelectionRef.current = Price.options.selection;
  }, [props.Id, Price.options.selection]);

  const fetchData = async () => {
    try {
      const chartData = await fetch(
        `https://api.coingecko.com/api/v3/coins/${props.Id}/market_chart?vs_currency=usd&days=${Price.options.selection}`
      );
      const jsonChartData = await chartData.json();

      setPrice({
        ...Price,
        series: [{ name: 'Market Price', data: jsonChartData.prices }],
      });

      setMarketCap({
        ...Market_Cap,
        series: [{ name: 'Market Cap (USD)', data: jsonChartData.market_caps }],
      });

      setTotVol({
        ...Tot_Vol,
        series: [{ name: 'Market Volume', data: jsonChartData.total_volumes }],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-between">
          <div className="col" style={{ maxWidth: '100%' }}>
            <div id="chart" style={{marginLeft:"5px"}}>
              <div className="toolbar" style={{marginLeft:"10px"}}>
                <button
                  id="one_month"
                  onClick={() => setPrice({ ...Price, options: { ...Price.options, selection: 1 } })}
                >
                  1D
                </button>
                &nbsp;
                <button
                  id="six_month"
                  onClick={() => setPrice({ ...Price, options: { ...Price.options, selection: 7 } })}
                >
                  1W
                </button>
                    &nbsp;
                <button
                  id="one_year"
                  onClick={() => setPrice({ ...Price, options: { ...Price.options, selection: 30 } })}
                >
                  1M
                </button>
                  &nbsp;
                    <button
                  id="ytd"
                  onClick={() => setPrice({ ...Price, options: { ...Price.options, selection: 182 } })}
                >
                  6M
                </button>
                    &nbsp;
                <button
                  id="all"
                  onClick={() => setPrice({ ...Price, options: { ...Price.options, selection: 365 } })}
                >
                  1Y
                </button>
              </div>
              <Chart options={Price.options} series={Price.series} type="area" height="400" width="550" />

            </div>
          </div>
          <div className="col text-center" style={{ maxWidth: '100%' }}>

                <div className="card-body ">
                    <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}> Market Cap </h6>
                    <p className="card-text fw-bold "
                        style={{ fontFamily: 'NHaasGroteskDSPro-65Md', color: 'rgb(255, 255, 255)', fontSize: 'small' }}>
                        $ {props.MarketCap}
                    </p>
                </div>

                <div className="card-body ">
                    <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}> Price Change 24hrs </h6>
                    <p className="card-text fw-bold "
                        style={{ fontFamily: 'NHaasGroteskDSPro-65Md', color: 'rgb(255, 255, 255)', fontSize: 'small' }}>
                        $ {props.priceChange24}
                    </p>
                </div>
                <div className="card-body ">
                    <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}> Total Volume </h6>
                    <p className="card-text fw-bold "
                        style={{ fontFamily: 'NHaasGroteskDSPro-65Md', color: 'rgb(255, 255, 255)', fontSize: 'small' }}>
                        $ {props.TotVol}
                    </p>
                </div>
                <div className="card-body ">
                    <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}> Circulating Supply</h6>
                    <p className="card-text fw-bold "
                        style={{ fontFamily: 'NHaasGroteskDSPro-65Md', color: 'rgb(255, 255, 255)', fontSize: 'small' }}>
                        {props.Circulating}
                    </p>
                </div>
                <div className="card-body ">
                    <h6 className="card-title" style={{ fontFamily: 'NHaasGroteskDSPro-65Md' }}> Twitter Followers</h6>
                    <p className="card-text fw-bold "
                        style={{ fontFamily: 'NHaasGroteskDSPro-65Md', color: 'rgb(255, 255, 255)', fontSize: 'small' }}>
                        {props.twitterF}
                    </p>
                </div>
            </div>
          <div className="col" style={{ maxWidth: '100%' }}>
            <div >
                <Chart
                    options={Market_Cap.options}
                    series={Market_Cap.series}
                    type="line"
                    height='200'
                    width='300' />
            </div>
            <div >
                <Chart
                    options={Tot_Vol.options}
                    series={Tot_Vol.series}
                    type="line"
                    height='200'
                    width='300' />
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
