import Chart from "react-apexcharts";

export const BarChart = ({ categories, points, dataVotes }) => {

    const options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            distributed: true
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories
        },
        annotations: {
          points
        }
      };
    
      const series = [{
        name: 'Votes',
        data: dataVotes
      }];
    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="300"
        />
    )
}
