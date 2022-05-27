var ctx = document.getElementById('burndown').getContext('2d')
var labels = [...Array(22).keys()];
var step = remaining[0] / 21;
var ideal = labels.map(x => Math.ceil(remaining[0] - x*step))


var burndown = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Actual',
        data: remaining,
        cubicInterpolationMode: 'default',
        tension: 0.4,
        borderWidth: 3,
        borderColor: '#3F51B5',
        backgroundColor: '#3F51B5'
      },
      {
        label: 'Ideal',
        data: ideal,
        borderWidth: 1,
        borderColor: '#673AB7',
        cubicInterpolationMode: 'default',
        tension: 0.1,
        backgroundColor: '#673AB7'
      }
    ]
  },
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Día'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Horas Restantes'
        }
      }
    },
    responsive: false
  }
});
