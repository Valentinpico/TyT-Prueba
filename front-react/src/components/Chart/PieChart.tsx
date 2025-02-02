import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTodoStore } from "../../store/useTodoStore";

type ApexOptionsProps = {
  type?:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
  series?: ApexOptions["series"];
  width?: string | number;
  height?: string | number;
  options?: ApexOptions;
};

export const PieChart = () => {
  const todos = useTodoStore((state) => state.todos);

  const completedTodos = todos.filter((todo) => todo.Completed).length;
  const incompletedTodos = todos.filter((todo) => !todo.Completed).length;

  const options: ApexOptionsProps = {
    series: [completedTodos, incompletedTodos],
    options: {
      chart: {
        width: 400,
        type: "donut" as const,
      },
      tooltip: {
        theme: "dark",
        items: {
          display: "flex",
        },
      },
      stroke: {
        width: 3,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: ["Completadas", "Incompletas"],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 1,
        },
      },

      title: {
        text: "Grafico de tareas",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <ReactApexChart
          options={options.options}
          series={options.series}
          type="donut"
          width={500}
        />
      </div>

      <div id="html-dist"></div>
    </>
  );
};
