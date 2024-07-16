document.addEventListener('DOMContentLoaded', () => {
    const ctxCurrent = document.getElementById('currentChart').getContext('2d');
    const ctxVoltage = document.getElementById('voltageChart').getContext('2d');
    const ctxPower = document.getElementById('powerChart').getContext('2d');
    const ctxEnergy = document.getElementById('energyChart').getContext('2d');

    const currentChart = new Chart(ctxCurrent, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Current (A)',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        }
    });

    const voltageChart = new Chart(ctxVoltage, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Voltage (V)',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });

    const powerChart = new Chart(ctxPower, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Power (W)',
                data: [],
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        }
    });

    const energyChart = new Chart(ctxEnergy, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Energy (Wh)',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });

    async function fetchData() {
        const response = await fetch('http://127.0.0.1:5000/data');
        const data = await response.json();

        const time = new Date().toLocaleTimeString();
        currentChart.data.labels.push(time);
        voltageChart.data.labels.push(time);
        powerChart.data.labels.push(time);
        energyChart.data.labels.push(time);

        currentChart.data.datasets[0].data.push(data.current);
        voltageChart.data.datasets[0].data.push(data.voltage);
        powerChart.data.datasets[0].data.push(data.power);
        energyChart.data.datasets[0].data.push(data.energy);

        currentChart.update();
        voltageChart.update();
        powerChart.update();
        energyChart.update();
    }

    setInterval(fetchData, 1000);
});
